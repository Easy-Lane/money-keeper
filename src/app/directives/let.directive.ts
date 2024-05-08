import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ILetContext<T> {
  ngLet: T;
}

@Directive({
  selector: '[ngLet]',
  standalone: true,
})
export class LetDirective<T> {
  private context: ILetContext<T | null> = {
    ngLet: null,
  };

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<ILetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set ngLet(value: T) {
    this.context.ngLet = value;
  }
}
