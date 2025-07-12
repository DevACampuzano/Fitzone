interface PropsToast {
  msg: string;
  show: boolean;
  icon?:
    | 'warning-sharp'
    | 'checkmark-circle-outline'
    | 'information-circle-outline';
  callbackEnd: () => void;
}
