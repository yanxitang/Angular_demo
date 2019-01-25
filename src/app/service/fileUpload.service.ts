import { selfHttp } from './selfhttp.service';
import { Injectable } from '@angular/core';

@Injectable()
export class uploadService {
    client;
    // public arr = [];
    // public str: any = ""
    constructor(public http: selfHttp) {

    }
    //点击触发上传
    public initUpload(e: any, callback) {
        var vm = this
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
                    // console.log(typeof e.target.files, e.target.files.length)
                    vm.getToken(e, function (url) {
                        callback(url)
                    })

                }
            })
    }

    //调用上传
    public getToken(e, callback) {
        var vm = this
        // vm.arr=[]
        vm.mulitUpload(e, e.target.files.length, 0, callback)
    }

    //判断文件是否多选
    public mulitUpload(e, len, i, callback) {
        var vm = this
        // console.log(e)
        vm.cilentLoad(e, len, i, callback)
    }

    //调用分片上传,上传图片乱序(区分是多图上传还是单图上传时清空位置不确定，直接在client中上传会导致数值重复)
    public cilentLoad(e, len, i, callback) {
        var vm = this
        vm.client.multipartUpload(e.target.files[i].name, e.target.files[i]).then(function (result) {
            // console.log('请求结果', result, result.res.requestUrls, result.res.requestUrls[0].split('?')[0])
            if (i + 1 < len) {
                vm.mulitUpload(e, len, i + 1, callback)
            }
            // console.log('hhhhh',vm.arr)
            // vm.arr.push(result.res.requestUrls[0].split('?')[0])
            // vm.str = (len != 1) ? vm.arr : vm.arr[0]
            callback(result.res.requestUrls[0].split('?')[0])
        }).catch(function (err) {
            console.log(err);
        });

    }
}