export interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: {
            id: number;
            is_bot: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
        };
        chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
            photo_url?: string;
        };
        auth_date: number;
        hash: string;
        query_id?: any;
    };
    version: string;
    platform: string;
    colorScheme: "light" | "dark";
    themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;
    };
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isExpanded: boolean;
    isClosingConfirmationEnabled: boolean;

    expand(): void;

    close(): void;

    showAlert(message: string, callback?: () => void): void;

    showConfirm(message: string, callback: (confirmed: boolean) => void): void;

    showPopup(params: {
        title?: string;
        message: string;
        buttons?: Array<{
            id?: string;
            type?: "default" | "ok" | "close" | "cancel" | "destructive";
            text: string;
        }>;
    }, callback?: (button_id: string) => void): void;

    setHeaderColor(color: string): void;

    setBackgroundColor(color: string): void;

    enableClosingConfirmation(): void;

    disableClosingConfirmation(): void;

    onEvent(eventType: string, callback: () => void): void;

    offEvent(eventType: string, callback?: () => void): void;

    sendData(data: string): void;

    ready(): void;
}

export interface Telegram {
    WebApp: TelegramWebApp;
}

// Определяем глобальный объект window с Telegram
declare global {
    interface Window {
        Telegram: Telegram;
    }
}
