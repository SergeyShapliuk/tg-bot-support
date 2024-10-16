import {useCallback, useEffect} from "react";
import {useAdsgram} from "../../hooks/useAdsgram";
import {ShowPromiseResult} from "../../types/adsgram";

const AdsGram = ({blockId}: { blockId: string }) => {
    const onReward = useCallback(() => {
        alert("Reward");
    }, []);

    const onError = useCallback((result: ShowPromiseResult) => {
        alert(JSON.stringify(result, null, 4));
    }, []);

    const showAd = useAdsgram({blockId, onReward, onError});

    useEffect(() => {
        // Запускаем показ рекламы сразу при монтировании компонента
        showAd();
    }, [showAd]);

    return null;
};

export default AdsGram;
