
export const sleep = (seconds = 1): Promise<boolean> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)

        }, 1000 * seconds);
    })
}