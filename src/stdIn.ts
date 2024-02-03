const { stdin } = process

// Taken from https://github.com/sindresorhus/get-stdin and to avoid an import error
export default async function getStdin(): Promise<string> {
    let result = ""

    if (stdin.isTTY) {
        return result
    }

    stdin.setEncoding("utf8")

    for await (const chunk of stdin) {
        result += chunk
    }

    return result
}
