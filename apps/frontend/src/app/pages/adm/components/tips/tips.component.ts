import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../../../models/session';
import Vditor from 'vditor';
import { take } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';
declare const $;

@Component({
  selector: 'frontend-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  vditor: Vditor
  session: Session

  constructor(private router: Router, private sMarkdown: MarkdownService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.session = this.router.getCurrentNavigation().extras.state as Session
    } else {
      this.router.navigate(['/adm/learn'])
    }
  }

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', {
      height: 500,
      toolbar: ['headings', 'bold', 'italic', 'strike', '|', 'line', 'quote', 'list', 'ordered-list', 'check', 'outdent', 'indent', 'inline-code', 'insert-after', 'insert-before', 'undo', 'redo', 'link', 'table', 'br'],
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.sMarkdown.getSource(this.session.url_content).pipe(take(1)).subscribe(md => {
          this.vditor.setValue(md)
        })
      }
    })
  }

  exitTip() {
    //* show loader
    $('#loader').removeClass('loaded')
    this.router.navigate(['/adm/learn'])
  }
}
