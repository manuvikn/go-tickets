import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'gt-footer',
  template: `
    <footer class="footer">
      <div class="footer-section">
        <p>Author: Manuel Victoria</p>
        <p><a href="https://manuelvictoria.net">manuelvictoria.net</a></p>
      </div>
      <div class="footer-section right-side">
        <p>Logo by <a href="https://icons8.com">Icons8</a></p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
        padding: 1em;
        background-color: var(--primary-color);
        font-size: 12px;

        p {
            margin: 0px;
            & > a, & {
                color: var(--primary-text-color);
            }
            a {
                font-weight: 600;
            }
        }

        .right-side {
            align-self: flex-end;
        }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
