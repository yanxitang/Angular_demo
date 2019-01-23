import { Component, OnInit, Input } from "@angular/core"
import { menuService } from 'src/app/service/menu.service';

@Component({
    selector: 'side-bar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})

export class SiderBarComponent implements OnInit {
    @Input() isCollapsed;
    triggerTemplate = null;
    menus;
    constructor(
        private menu: menuService
    ) { }

    ngOnInit() {
        console.log(this.isCollapsed)
        this.menus = this.menu.menus();
    }

    openHandler(value: string): void {
        console.log(value)
        for (const key in this.menus) {
            if (this.menus[key].link !== value) {
                this.menus[key].subStatus = false;
            }
        }
    }
}
