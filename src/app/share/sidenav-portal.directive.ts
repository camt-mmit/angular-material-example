import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SidenavPortalService } from './sidenav-portal.service';

@Directive({
  selector: '[appSidenavPortal]',
})
export class SidenavPortalDirective implements AfterViewInit, OnDestroy {
  constructor(
    private readonly sidnavPortalService: SidenavPortalService,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  ngOnDestroy(): void {
    this.sidnavPortalService.setPortal(null);
  }

  ngAfterViewInit(): void {
    this.sidnavPortalService.setPortal(
      new TemplatePortal(this.templateRef, this.viewContainerRef),
    );
  }
}
