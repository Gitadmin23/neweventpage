import { GetEventDetailInfo } from '@/components/eventdetailscomponents';
import { IMAGE_URL } from '@/helpers/services/urls';
import type { Metadata } from 'next'
// import { URLS } from "@/services/urls"

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const id = params.slug
  const url = process.env.NEXT_PUBLIC_BASE_URL as string

  // fetch data
  let product: any
  try {
    product = await fetch(url + "/events/events?id=" + id, {
      // headers: myHeaders,
      method: 'GET'
    }).then((res) => res.json())

    // console.log(product);
  } catch (error) {
    console.log(error);
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [] 

  return {
    title: product?.content?.length > 0 ? product?.content[0]?.eventName : "",
    description: product?.content?.length > 0 ? product?.content[0]?.eventDescription : "",
    openGraph: {
      title: product?.content?.length > 0 ? product?.content[0]?.eventName : "",
      description: product?.content?.length > 0 ? product?.content[0]?.eventDescription : "",
      images: [{
        url: IMAGE_URL + (product?.content?.length > 0 ? product?.content[0]?.currentPicUrl : ""),
      }],
    },
  }
}


export default async function EventDetailsPage(props: Props) {
  const params = await props.params;

  return (
    <GetEventDetailInfo event_index={params.slug} />
  )
}