import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { selfHttp } from './../../../service/selfhttp.service'
import { uploadService } from 'src/app/service/fileUpload.service';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.less']
})
export class FileUploadComponent implements OnInit {
  client;
  fileDOM;
  url: any = "";
  arr: [] = []
  fileUploadUrl = '/api/dbnc/manager/common/upload'
  constructor(private el: ElementRef,
     private http: selfHttp, 
     private render: Renderer2, 
     private upload: uploadService,
     private https:HttpClient) {
  }

  ngOnInit() {
    // console.log(this.oss.multipartUpload)
    // console.log(this.el.nativeElement.querySelector('#inputLoad').addEventListener('change',function(){
    //   console.log('121')
    // }))

  }

  changeUrl(index) {
    var vm = this
    console.log(index)
    console.log(this.el.nativeElement.querySelector('#inputLoad'))
    var domName = document.getElementById('inputLoad')
    this.render.listen(domName, 'change', function (e: any) {
      vm.upload.initUpload(e, function (data) {
        //这里处理是否是多图上传
        vm.url = data
        console.log(vm.url)
      })
    })
  }

  changeUrls() {
    var vm = this
    console.log(this.el.nativeElement.querySelector('#inputLoad'))
    var domName = document.getElementById('inputLoad')
    this.render.listen(domName, 'change', function (e: any) {
      console.log(e)
      var file = e.target.files;
      console.log(file.length)
      var storeAs = Math.random().toString(36).substr(2);
      console.log(file.name + ' => ' + storeAs, file);
      vm.http.ossget('http://bwcc.30days-tech.com/bwcc/v1/oss/account', {},
        res => {
          console.log(res)
          if (res.resultStatus) {
            var data = res.resultData
            vm.client = new OSS({
              accessKeyId: data.accessKeyId,
              accessKeySecret: data.accessKeySecret,
              stsToken: data.securityToken,
              endpoint: 'http://oss-cn-shanghai.aliyuncs.com',
              bucket: 'mini-dabainiu',
              timeout: 300000,
            });
            console.log(typeof e.target.files, e.target.files.length)
            vm.getToken(e)
          }
        })
      })
    }

  getToken(e){
        var vm = this
    vm.mulitUpload(e, function (data) {
          console.log(data)
        })
      }

  //判断文件是否多选
  mulitUpload(e, callback) {
        var vm = this
    console.log(e)
    var arr = []
    if(e.target.files.length != 1) {
      for (let i = 0; i < e.target.files.length; i++) {
        vm.cilentLoad(e.target.files[i].name, e.target.files[i], function (data) {
          arr.push(data)
          callback(arr)
        })
      }
    } else {
      vm.cilentLoad(e.target.files[0].name, e.target.files[0], function (data) {
        arr.push(data)
        callback(arr)
      })
    }
  }

  //调用分片上传
  cilentLoad(name, files, callback) {
    var vm = this
    vm.client.multipartUpload(name, files).then(function (result) {
      console.log('请求结果', result, result.res.requestUrls, result.res.requestUrls[0].split('?')[0])
      callback(result.res.requestUrls[0].split('?')[0])
    }).catch(function (err) {
      console.log(err);
    });
  }


  //ng-zorro-ant  文件流上传
  customReq = (item: UploadXHRArgs) => {
    var vm =this
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', vm.fileUploadUrl, formData, {
      reportProgress : true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.https.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  // 一个简单的分片上传
  customBigReq = (item: UploadXHRArgs) => {
    var vm =this
    const size = item.file.size;
    const chunkSize = parseInt((size / 3) + '', 10);
    const maxChunk = Math.ceil(size / chunkSize);
    const reqs = Array(maxChunk).fill(0).map((v: {}, index: number) => {
      const start = index * chunkSize;
      let end = start + chunkSize;
      if (size - end < 0) {
        end = size;
      }
      const formData = new FormData();
      formData.append('file', item.file.slice(start, end));
      formData.append('start', start.toString());
      formData.append('end', end.toString());
      formData.append('index', index.toString());
      const req = new HttpRequest('POST', vm.fileUploadUrl, formData, {
        withCredentials: true
      });
      return this.https.request(req);
    });
    return forkJoin(...reqs).subscribe(resules => {
      // 处理成功
      item.onSuccess({}, item.file, event);
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  // fileEvent(e:any){
  //   var vm= this;
  //   console.log(e)
  //   var file = e.target.files;
  //   console.log(file.length)
  //   var storeAs = Math.random().toString(36).substr(2);
  //   console.log(file.name + ' => ' + storeAs,file);
  //   this.http.ossget('http://bwcc.30days-tech.com/bwcc/v1/oss/account',{},
  //   res =>{
  //     console.log(res)
  //     if(res.resultStatus){
  //       var data = res.resultData
  //       var client = new OSS({
  //         accessKeyId: data.accessKeyId,
  //         accessKeySecret: data.accessKeySecret,
  //         stsToken: data.securityToken,
  //         endpoint: 'http://oss-cn-shanghai.aliyuncs.com',
  //         bucket: 'mini-dabainiu',
  //         timeout:300000,
  //       });
  //       console.log(file,storeAs);
  //       client.multipartUpload(storeAs, file).then(function (result) {
  //         console.log('请求结果',result,result.res.requestUrls,result.res.requestUrls[0].split('?')[0])
  //       }).catch(function (err) {
  //         console.log(err);
  //       });
  //     }
  //   })
  // }



  // fileEvent(fileInput: any) {  
  //   console.log(fileInput)
  //   const file = fileInput.target.files[0]  //  获取文件资源
  //   console.log('file',file)
  //   const reader = new FileReader()
  //   if (file) reader.readAsDataURL(file)    // 读取文件
  //   // if(file)  reader.readAsArrayBuffer(file);
  //   console.log(file)
  //   this.uploadFile(file);                  // 调用上传方法
  //   fileInput.target.value = ''             // 重置以便下次可上传同个文件（以通过change检测）
  // }
  // uploadFile(file) {
  //   console.log(file.fileVal)
  //   // var buffer = new OSS.Buffer(file.fileVal);
  //   // this.client.put('think', file.fileVal).catch((err) => {
  //   //   if (err) {
  //   //     console.log(err);
  //   //     return;
  //   //   }
  //   // }).then((result) => {
  //   //   console.log(result);
  //   // })
  //   this.client.multipartUpload('think', file.fileVal).then(function (result) {
  //     console.log(result);
  //     }).catch(function (err) {
  //     console.log(err);
  //     });
  // }

  //   toBlob(urlData, fileType) {
  //     var bytes = window.atob(urlData),
  //       n = bytes.length,
  //       u8arr = new Uint8Array(n);
  //     while (n--) {
  //       u8arr[n] = bytes.charCodeAt(n);
  //     }
  //     return new Blob([u8arr], { type: fileType });
  //   }

  //   // 图像数据 (e.g. data:image/png;base64,iVBOR...yssDuN70DiAAAAABJRU5ErkJggg==)
  //   public dataUrl;
  //   public base64 = this.dataUrl.split(',')[1];
  //   public fileType = this.dataUrl.split(';')[0].split(':')[1];
  //   // base64转blob
  //   public blob = this.toBlob(this.base64, this.fileType);
  //   // blob转arrayBuffer
  //    reader = new FileReader();
  //   //  reader.readAsArrayBuffer(blob);
  //   reader.onload = function (event) {

  //   // 配置
  //   var client = new OSS.Wrapper({
  //     accessKeyId: 'STS.NKG8eHfa6d2kyrZYnbKYktx6L',
  //     accessKeySecret: 'BUMaR8DZfBVK7h8NxStZ9HfYGVr2KUfdT5RmKGoiBEkZ',
  //     bucket: 'dabainiu',
  //     region: "CAIShQJ1q6Ft5B2yfSjIr4jyc9/8i74X0/CAe1TrvW43R9ZHm72drjz2IHBNeXVrBu4Wtfkxm29W6v0clqVoRoReREvCKM1565kPMdIqiGeE6aKP9rUhpMCPKwr6UmzGvqL7Z+H+U6mqGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wIDLkQRRLqL0AFZrFsKxBltdUROFbIKP+pKWSKuGfLC1dysQcO7gEa4K+kkMqH8Uic3h+oiM1t/tutfsD7M5A8ZsknD4/qjNYbLPSRjHRijDFR77pzgaB+/jPKg8qQGVE54W/dY7OJroYwcl8iO/ZlRPAY96bm9/FyvOeWkpnsyh1d+2PL69JwoOsagAGufigtpk8Zz4HzCkEzQnmrcQAyF7L3olgUxxc0sN5wQl6Z+7w6z6m3v7QKqLqISbYtHUOl161IY18k+JXpsYp90168/NLO/m8Gn0EkFp8VpwcgHDkxSowLuUDGVpgbuObiitIEIRP9zNothTMHUKsrweTWnbJeHqVK6FaNHiExjw=="
  //   });

  //   // 文件名
  //   var date = new Date();
  //   var time = '' + date.getFullYear() ;
  //   var storeAs = 'Uploads/file/' + time + '/' + date.getTime() + '.' + this.blob.type.split('/')[1];
  //   // arrayBuffer转Buffer
  //   var buffer = new OSS.Buffer(event.target.result);
  //   // 上传
  //   client.put(storeAs, buffer).then(function (result) {
  //     console.log(result)
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }



  // fileEvent(e:any){
  //     let file = e.target.files[0];
  //     let storeAs = 'com';
  //     console.log(file.name + ' => ' + storeAs);
  //   // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者完全可以使用任何发请求的库向`sts-server`发送请求
  //   OSS.urllib.request("http://bwcc.30days-tech.com/bwcc/v1/oss/account", {method: 'GET'}, (err, response) => {
  //     console.log(response,err)
  // 	  if (err) {
  // 		return alert(err);
  // 	  }
  // 	  try {
  // 		var result = JSON.parse(response);
  // 	  } catch (e) {
  // 		return alert('parse sts response info error: ' + e.message);
  // 	  }
  // 	  let client = new OSS({
  //     accessKeyId: 'STS.NKG8eHfa6d2kyrZYnbKYktx6L',
  //     accessKeySecret: 'BUMaR8DZfBVK7h8NxStZ9HfYGVr2KUfdT5RmKGoiBEkZ',
  //     region: "CAIShQJ1q6Ft5B2yfSjIr4jyc9/8i74X0/CAe1TrvW43R9ZHm72drjz2IHBNeXVrBu4Wtfkxm29W6v0clqVoRoReREvCKM1565kPMdIqiGeE6aKP9rUhpMCPKwr6UmzGvqL7Z+H+U6mqGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wIDLkQRRLqL0AFZrFsKxBltdUROFbIKP+pKWSKuGfLC1dysQcO7gEa4K+kkMqH8Uic3h+oiM1t/tutfsD7M5A8ZsknD4/qjNYbLPSRjHRijDFR77pzgaB+/jPKg8qQGVE54W/dY7OJroYwcl8iO/ZlRPAY96bm9/FyvOeWkpnsyh1d+2PL69JwoOsagAGufigtpk8Zz4HzCkEzQnmrcQAyF7L3olgUxxc0sN5wQl6Z+7w6z6m3v7QKqLqISbYtHUOl161IY18k+JXpsYp90168/NLO/m8Gn0EkFp8VpwcgHDkxSowLuUDGVpgbuObiitIEIRP9zNothTMHUKsrweTWnbJeHqVK6FaNHiExjw==",
  //     endpoint: 'http://oss-cn-shanghai.aliyuncs.com',
  // 		bucket: 'mini-dabainiu'
  // 	  });
  //         //storeAs表示上传的object name , file表示上传的文件
  // 	  client.multipartUpload(storeAs, file).then(function (result) {
  // 		console.log(result);
  // 	  }).catch(function (err) {
  // 		console.log(err);
  // 	  });
  // 	});
  // }



}
