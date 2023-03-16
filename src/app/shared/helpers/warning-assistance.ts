import iziToast from 'izitoast';

export const warningAssistance = (
  title: string,
  message: string,
  callback: Function
) => {
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 0,
    id: 'question',
    zindex: 10000,
    title,
    message,
    position: 'center',
    buttons: [
      [
        '<button><b>YES</b></button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          callback();
        },
        true,
      ],
      [
        '<button>NO</button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        },
        false,
      ],
    ],
  });
};
