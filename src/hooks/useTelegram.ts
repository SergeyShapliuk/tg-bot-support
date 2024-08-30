const tg = window.Telegram.WebApp;

export function useTelegram() {
    return {
        tg,
        user: tg.initDataUnsafe?.user?.username,
        chatId: tg.initDataUnsafe?.user?.id,
        queryId: tg.initDataUnsafe?.query_id
    };

}
