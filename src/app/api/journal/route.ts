import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { client as baseClient } from '@/sanity/lib/client';


const QUERY = groq`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc)[$offset...$end]{
  _id,
  title,
  body,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  mainImage{
    asset->{
      url,
      metadata{ dimensions{ width, height, aspectRatio } }
    }
  }
}
`;


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const offset = Number(searchParams.get('offset') ?? '0');
const limit = Math.min(Number(searchParams.get('limit') ?? '5'), 20);
const end = offset + limit;


const token = process.env.SANITY_API_READ_TOKEN; // keep private
const client = token
? baseClient.withConfig({ token, useCdn: false })
: baseClient; // works for public datasets without token


try {
const posts = await client.fetch(QUERY, { offset, end });
return NextResponse.json({ posts });
} catch (err) {
console.error('[journal] fetch error', err);
return NextResponse.json({ posts: [], error: 'Failed to fetch posts' }, { status: 500 });
}
}