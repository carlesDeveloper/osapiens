export interface ErrorModal {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    msg: string,
    setMsgError: (err: string)=> void
}