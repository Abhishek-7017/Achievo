import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { Tab } from '../tab/tab';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-container',
  imports: [CommonModule],
  templateUrl: './tab-container.html',
  styleUrl: './tab-container.css'
})
export class TabContainer implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab> = new QueryList();
  
  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter(tab=>tab.active);
    if(!activeTabs||activeTabs?.length===0){
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab:Tab){
    this.tabs.forEach(tab=>tab.active=false);
    tab.active = true;
  }
}
