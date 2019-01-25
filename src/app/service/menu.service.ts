import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class menuService {
    constructor() { }
    _Menus = [
        {
            text: '表格',
            link: 'list',
            icon: 'home',
            subStatus: true,
            children: [
                {
                    text: '列表',
                    link: 'list',
                    icon: ''
                }    
            ]
        },
        {
            text: '图表',
            link: 'chart',
            icon: 'line-chart',
            children: [
                {
                    text: '折线图',
                    link: 'chart',
                    icon: '',
                }
            ]
        },
        {
            text: '文件上传',
            link: 'file',
            icon: 'appstore',
            subStatus: false,
            children: [
                {
                    text: '上传',
                    link: 'file',
                    icon: '',
                }

            ]
        },
        {
            text: '百度地图',
            link: 'map',
            icon: 'compass',
            subStatus: false,
            children: [
                {
                    text: '开始',
                    link: 'map',
                    icon: '',
                }
            ]
        },
        {
            text: '测试',
            link: 'ceshi',
            icon: 'experiment',
            subStatus: false,
            children: [
                {
                    text: '测试',
                    link: 'ceshi',
                    icon: '',
                }
            ]
        },
        {
            text: '表单',
            link: 'from',
            icon: 'experiment',
            subStatus: false,
            children: [
                {
                    text: '表单数据的绑定模式',
                    link: 'form',
                    icon: '',
                }
            ]
        },
        {
            text: '视频',
            link: '',
            icon: 'experiment',
            subStatus: false,
            children: [
                {
                    text: '视频列表',
                    link: 'video',
                    icon: '',
                }]
        }
    ];

    menus() {
        return this._Menus;
    }
}
