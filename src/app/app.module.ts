import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule],//本模块组件模板中需要由其它模块导出的类。
    declarations: [AppComponent],//本模块中拥有的视图类。 Angular 有三种视图类： 组件 、 指令 和 管道 。
    exports: [], // 声明（ declaration ）的子集，它可用于其它模块中的组件 模板 。
    providers: [],//服务的创建者。本模块把它们加入全局的服务表中，让它们在应用中的任何部分都可被访问到。
    bootstrap: [AppComponent]//标识出应用的主视图（被称为 根组件 ）
})
export class AppModule { }
