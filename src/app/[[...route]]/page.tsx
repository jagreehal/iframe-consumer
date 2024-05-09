export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { route: string } }) {
  const response = await fetch(
    `${process.env.PROVIDER_APP_URL}/api/v1/embedded-client-login/${
      params.route || 'debug'
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PROVIDER_API_KEY!,
      },
    }
  );

  const { url } = await response.json();

  if (!url) {
    return <div>Unauthorized</div>;
  }

  return <iframe className="min-h-screen w-full" src={url} />;
}
