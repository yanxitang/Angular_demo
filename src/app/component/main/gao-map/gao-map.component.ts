import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gao-map',
  templateUrl: './gao-map.component.html',
  styleUrls: ['./gao-map.component.less']
})
export class GaoMapComponent implements OnInit {
  map;
  geocoder;
  markers=[];
  markers2;
  //初始化地图的默认值
  searchName: string = '上海东方明珠广播电视塔'
  //获取查询到的位置的经纬度
  lat: number;
  lng: number;

  constructor() {
  }

  ngOnInit() {
    this.createMap()
    // this.marker()
    this.geoCode() //初始化点
   
  }

  //地图初始化
  createMap() {
    var vm = this
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 13
    });
    //添加省市街的控件
    var toolBar = new AMap.ToolBar({
      visible: true
    })
    this.map.addControl(toolBar);
    //  点击地图的或经纬度，同时添加点(添加点不知怎样清除)
    this.map.on('click', function (e) {
      console.log(vm.markers)
      vm.map.remove(vm.markers);
      vm.addMarker(e.lnglat.lat, e.lnglat.lng)
    })
   
    // var lnglats=[],markers=[];
    // this.map.on('click',function(e){
    //   if(lnglats.length<=1){
    //       lnglats.push(e.lnglat);
    //       var marker = new AMap.Marker({
    //           icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //           position: e.lnglat
    //       });
    //       markers.push(marker);
    //       vm.map.add(marker);
    //   }

    // })
  }

  //使用AmapUI的方式添加点
  // marker(lat: Number, lng: any) {
  //   var vm = this
  //   vm.map.remove();
  //   AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
  //     new SimpleMarker({
  //       //普通文本
  //       iconLabel: 'A',
  //       map: vm.map,
  //       position: [lng, lat]
  //     });
  //   })
  // }
  //添加点
  addMarker(lat: Number, lng: any) {
    var marker;
    var vm = this
    marker = new AMap.Marker({
      iconLabel: 'A', //提示的字体
      icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      position: [Number(lng), Number(lat)],
    });
    console.log(vm.markers.length)
    if(vm.markers.length) {
      vm.markers.splice(0,1)
    }
    vm.markers.push(marker)
    vm.map.add(vm.markers)
    vm.map.setFitView();
  }

  // marker.setPosition([116.391467, 39.927761]); //更新点标记位置
  //创建搜索IPO搜索和设置点坐标
  // searchLocation() {
  //   var vm = this
  //   this.map.setCity(this.searchName);
  //   AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
  //     var poiPicker = new PoiPicker({
  //       input: 'searchInput',
  //       // placeSearchOptions: {
  //       //   map: vm.map,
  //       //   pageSize: 5
  //       // },
  //       // searchResultsContainer: 'searchResults'
  //     });
  //     poiPicker.on('poiPicked', function (poiResult) {
  //       console.log('poiResult', poiResult)
  //       poiPicker.hideSearchResults();
  //       var source = poiResult.source,
  //         poi = poiResult.item;
  //       if (source !== 'search') {
  //         //suggest来源的，同样调用搜索
  //         poiPicker.searchByKeyword(poi.name);
  //         vm.searchName = poi.name
  //       } else {
  //         console.log(poi);
  //         vm.lat = poi.location.lat
  //         vm.lng = poi.location.lng
  //         vm.marker(vm.lat, vm.lng)
  //         vm.map.setCity(poi.name); //根据搜索目标缩放地图
  //       }
  //     });
  //     poiPicker.onCityReady(function () {
  //       poiPicker.searchByKeyword(vm.searchName);
  //     });
  //   })
  // }

  //地址逆解析
  geoCode() {
    var vm = this
    if (!vm.geocoder) {
      vm.geocoder = new AMap.Geocoder({
        city: "", //城市设为北京，默认：“全国”
      });
    }
    if (vm.searchName.length != 1) {
      vm.geocoder.getLocation(vm.searchName, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
          var lnglat = result.geocodes[0].location
          if (!vm.markers2) {
            vm.markers2 = new AMap.Marker();
            vm.map.add(vm.markers2);
          }
          vm.markers2.setPosition(lnglat);
          vm.map.setFitView(vm.markers2);
        }
        else {
          return false
        }
      });
    }
  }
}
