# Angular Speed Dial

Material FAB Speed Dial for Angular based on
[Jeferson Estevo's implementation](https://github.com/jefersonestevo/angular-smd/tree/master/src/app/shared/component/smat-fab-speed-dial).

### Usage

Import the module `NgxSpeedDialModule`.

    <ngx-speed-dial
        [animationMode]="animationMode"
        [direction]="direction"
        [fixed]="fixed"
        [(open)]="open"
    >
        <ngx-speed-dial-trigger>
            <button mat-fab (click)="actionX()">
                <mat-icon>check</mat-icon>
            </button>
        </ngx-speed-dial-trigger>

        <ngx-speed-dial-actions>
            <button mat-mini-fab (click)="action1()">
                <mat-icon>add</mat-icon>
            </button>
            <button mat-mini-fab (click)="action2()">
                <mat-icon>edit</mat-icon>
            </button>
            <button mat-mini-fab (click)="action3()">
                <mat-icon>menu</mat-icon>
            </button>
        </ngx-speed-dial-actions>
    </ngx-speed-dial>

### Properties

#### ngx-speed-dial

| Property      | Type                    | Default | Description                                                                            |
| ------------- | ----------------------- | ------- | -------------------------------------------------------------------------------------- |
| open          | boolean                 | false   | Indicates if this FAB Speed Dial is opened                                             |
| direction     | up, down, left or right | up      | The direction to open the action buttons                                               |
| animationMode | fling or scale          | fling   | The animation to apply when opening the action buttons                                 |
| fixed         | boolean                 | false   | Indicates if this FAB Speed Dial is fixed (user cannot change the open state on click) |
| forceTooltips | boolean                 | false   | Indicates if button tooltips should be forced to remain open (useful on mobile)        |

#### ngx-speed-dial-trigger

| Property | Type    | Default | Description                                                                       |
| -------- | ------- | ------- | --------------------------------------------------------------------------------- |
| spin     | boolean | false   | Enables the rotation (360dg) of the trigger action when the speed dial is opening |

### TODO List

-   Change color of the fab buttons on hover/selection
-   Make the trigger button change icon when the user open the speed dial
    (configurable)
-   Let the speed dial open a "sheet" of material instead of just mini-fab
    action buttons
