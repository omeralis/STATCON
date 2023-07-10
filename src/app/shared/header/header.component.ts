import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  positionScroll =50;
  visibilityCompare: boolean = false;
  public navbarCollapsed = true;
  langStart:any;
  bntLang :boolean = true;
  header :any;
  titleLang:any;
  constructor(
    private translateService: TranslateService ,
    @Inject(DOCUMENT) private document: Document,
     private viewportScroller: ViewportScroller,
     ) {
      this.langStart = localStorage.getItem('dataLang');
      translateService.addLangs(['ar', 'en']);
      translateService.setDefaultLang('en');
     }

  ngOnInit(): void {
    this.langStart = localStorage.getItem('dataLang');
    this.changeLanguage(this.langStart);
    // localStorage.setItem('dataLang', 'en');
    console.log(this.langStart);
  }
  
  changeBtn(){
    this.bntLang = !this.bntLang;
  }
  changeLanguage(lang: string) {
    console.log(lang);
    localStorage.setItem('dataLang', lang);
    this.langStart = localStorage.getItem('dataLang');

    this.translateService.setDefaultLang(this.langStart);
    this.translateService.use(this.langStart);
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = this.langStart === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(this.langStart);
    this.translateService.use(this.langStart);
    this.navbarCollapsed = true;
    if (this.langStart == 'ar') {
      this.titleLang = 'Arabic'
    } else{
      this.titleLang = 'English'
    }
  }
  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    let bundleName = lang === "ar" ? "styles.rtl.scss" : "styles.scss";
    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/scss";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }

  // @HostListener('document:mousewheel', ['$event'])
  @HostListener('window:scroll', ['$event']) 
  scrollTop(event: any) {
    if (window.pageYOffset > this.positionScroll) {
      this.visibilityCompare = true;
      // console.log(this.visibilityCompare)
    } else {
      this.visibilityCompare = false;
    }
  }
  scrollToElement(element: any): void {
    element.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.visibilityCompare = true;
  }
}
