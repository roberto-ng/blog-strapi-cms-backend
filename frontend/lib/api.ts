export interface Post {
    titulo: string,
    texto: string,
    capa: Resposta< Dado<Midia> >,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}

export interface Midia {
    name: string,
    width: number,
    height: number,
    url: string,
    formats: {
        thumbnail: MidiaFormato,
        large: MidiaFormato,
        medium: MidiaFormato,
        small: MidiaFormato,
    },
}

export interface MidiaFormato {
    name: string,
    hash: string,
    width: number,
    height: number,
    url: string,
}

export type MidiaFormatoNome = 'thumbnail' | 'large' | 'medium' | 'small';

export interface Dado<T> {
    id: number,
    attributes: T,
}

export interface Resposta<T> {
    data: T,
    meta: any,
}

/** Retorna a URL completa do Strapi */
export function getStrapiURL(caminho = '') {
    const endereco = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    return `${endereco}${caminho}`;
}

export function getMediaURL(midia: Midia, formato: MidiaFormatoNome = 'thumbnail') {
    const caminho = midia.formats[formato]?.url;
    if (caminho != null) {
        return getStrapiURL(caminho);
    } else {
        return undefined;
    }
}

export async function buscarTodosPosts(): Promise<Resposta<Dado<Post>[]>> {
    const url = getStrapiURL('/api/posts?populate=*');
    const resposta = await fetch(url);
    if (!resposta.ok) {
        console.error(resposta.statusText);
        throw new Error(`Erro ${resposta.status}. Por favor, tente novamente`);
    }

    return await resposta.json();
}