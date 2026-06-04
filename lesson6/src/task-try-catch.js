const BROKEN_URL   = 'https://this-service-does-not-exist.dev/posts/1';
const FALLBACK_URL = 'https://jsonplaceholder.typicode.com/posts/1';

class HttpError extends Error {
    constructor(status, statusText) {
        super(`Fallback server returned an invalid response: ${status} ${statusText}`);
        this.name  = 'HttpError';
        this.status = status;
    }
}

class InvalidDataError extends Error {
    constructor(message) {
        super(`Fallback data is unusable – ${message}`);
        this.name = 'InvalidDataError';
    }
}

function validatePost(data) {
    if (!data || typeof data !== 'object') {
        throw new InvalidDataError('response is not an object');
    }
    const required = ['id', 'userId', 'title', 'body'];
    for (const field of required) {
        if (!(field in data)) {
            throw new InvalidDataError(`required field "${field}" is missing`);
        }
    }
    return data;
}

async function fetchFromPrimary() {
    console.log(`[primary]  Trying  → ${BROKEN_URL}`);
    const response = await fetch(BROKEN_URL);
    return response.json();
}

async function fetchFromFallback() {
    console.log(`[fallback] Trying  → ${FALLBACK_URL}`);
    const response = await fetch(FALLBACK_URL);

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }

    const data = await response.json();

    return validatePost(data);
}

async function main() {
    let post;

    try {
        post = await fetchFromPrimary();
        console.log('[primary]  Success (unexpected):', post);

    } catch (primaryError) {
        console.warn(`[primary]  Failed  – ${primaryError.message}`);
        console.log('[primary]  Redirecting request to the fallback service…\n');

        try {
            post = await fetchFromFallback();
            console.log('[fallback] Success – received a valid post.\n');

        } catch (fallbackError) {
            console.error(`[fallback] Failed  – ${fallbackError.name}: ${fallbackError.message}`);

            if (fallbackError instanceof HttpError) {
                console.error(`           HTTP status code: ${fallbackError.status}`);
            }

            throw fallbackError;
        }
    }

    if (post) {
        console.log('─'.repeat(50));
        console.log('[result]   Post retrieved successfully:');
        console.log({
            id:     post.id,
            userId: post.userId,
            title:  post.title,
            body:   post.body.slice(0, 60) + '…'
        });
        console.log('─'.repeat(50));
    }
}

main().catch((error) => {
    console.error('\n[fatal]    Unrecoverable error – all services are unavailable.');
    console.error(`           ${error.name}: ${error.message}`);
    //process.exit(1);
});
