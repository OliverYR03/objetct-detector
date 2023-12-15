import { CountState } from "../types"

export const getCountChips = async (countType: CountState) => {

    const resp = await fetch(`${import.meta.env.VITE_HOST_SERVER}/countchips?count_type=${countType}`,)

    const countChipsHeader = resp.headers.get('count_chips');
    const countTypeHeader = resp.headers.get('count_type');
    const countBlackHeader = resp.headers.get('Blackcount');
    const countWhiteHeader = resp.headers.get('Whitecount');

    const imgUrl = resp.url

    return {
        type: countTypeHeader,
        black: countBlackHeader,
        white: countWhiteHeader,
        count: countChipsHeader,
        imgUrl
    }
}