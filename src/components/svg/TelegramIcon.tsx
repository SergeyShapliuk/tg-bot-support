import {SVGProps, memo} from "react";

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21.997 12c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Zm-9.642-2.618c-.972.405-2.916 1.242-5.831 2.512-.474.189-.722.373-.744.553-.039.304.343.424.862.587l.218.07c.51.166 1.198.36 1.555.368.324.007.685-.127 1.084-.4 2.724-1.84 4.13-2.769 4.218-2.789.063-.014.149-.032.207.02.059.052.053.15.047.177-.038.161-1.534 1.552-2.308 2.271-.241.225-.413.384-.448.42a8.802 8.802 0 0 1-.235.233c-.474.457-.83.8.02 1.36.408.27.735.492 1.061.714.356.242.711.484 1.17.785.118.077.23.156.338.234.415.296.787.56 1.247.518.267-.024.543-.275.683-1.025.332-1.77.983-5.608 1.133-7.19a1.757 1.757 0 0 0-.017-.393.421.421 0 0 0-.142-.27c-.12-.098-.305-.118-.387-.117-.376.007-.954.207-3.73 1.362Z"
            clipRule="evenodd"
        />
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M21.997 12c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Zm-9.642-2.618c-.972.405-2.916 1.242-5.831 2.512-.474.189-.722.373-.744.553-.039.304.343.424.862.587l.218.07c.51.166 1.198.36 1.555.368.324.007.685-.127 1.084-.4 2.724-1.84 4.13-2.769 4.218-2.789.063-.014.149-.032.207.02.059.052.053.15.047.177-.038.161-1.534 1.552-2.308 2.271-.241.225-.413.384-.448.42a8.802 8.802 0 0 1-.235.233c-.474.457-.83.8.02 1.36.408.27.735.492 1.061.714.356.242.711.484 1.17.785.118.077.23.156.338.234.415.296.787.56 1.247.518.267-.024.543-.275.683-1.025.332-1.77.983-5.608 1.133-7.19a1.757 1.757 0 0 0-.017-.393.421.421 0 0 0-.142-.27c-.12-.098-.305-.118-.387-.117-.376.007-.954.207-3.73 1.362Z"
            clipRule="evenodd"
        />
    </svg>
);
const MemoTelegramIcon = memo(TelegramIcon);
export default MemoTelegramIcon;
