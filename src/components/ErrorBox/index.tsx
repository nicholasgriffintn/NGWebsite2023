import { PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';

export interface Props {
  statusCode?: string;
}

const ErrorBox = ({ statusCode = '500' }: PropsWithChildren<Props>) => {
  const [failImage, setFailImage] = useState(null);
  const [failData, setFailData] = useState<{
    url?: string;
    title?: string;
    user?: {
      display_name: string;
      profile_url: string;
    };
  }>({});

  useEffect(() => {
    const giphy = {
      baseURL: 'https://api.giphy.com/v1/gifs/',
      apiKey: '0UTRbFtkMxAplrohufYco5IY74U8hOes',
      tag: statusCode === '404' ? 'lost' : 'burning',
      type: 'random',
      rating: 'pg-13',
    };

    const giphyURL = encodeURI(
      `${giphy.baseURL + giphy.type}?api_key=${giphy.apiKey}&tag=${giphy.tag}&rating=${
        giphy.rating
      }`
    );

    fetch(giphyURL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setFailData(data.data);
          if (data.data.images && data.data.images.downsized_large) {
            setFailImage(data.data.images.downsized_large.url);
          } else if (data.data.image_original_url) {
            setFailImage(data.data.image_original_url);
          }
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [statusCode]);

  return (
    <>
      <div className="ng-text-center ng-max-w-[780px] ng-min-h-[450px] ng-mx-auto ng-relative">
        {failImage ? (
          <Image
            src={failImage}
            alt="Everything is fine..."
            layout="fill"
            quality={80}
            objectFit="contain"
          />
        ) : null}
      </div>
      <br></br>
      {failData?.url ? (
        <div className="ng-text-primary ng-text-center">
          <small className="ng-text-center ng-min-w-[480px] ng-mx-auto">
            {failData.title} was retrieved from{' '}
            <a target="_blank" rel="noopener noreferrer" href={failData.url}>
              GIPHY
            </a>{' '}
            {failData.user ? (
              <>
                and was uploaded by{' '}
                <a target="_blank" rel="noopener noreferrer" href={failData.user.profile_url}>
                  {failData.user.display_name}
                </a>
              </>
            ) : null}
          </small>
        </div>
      ) : null}
    </>
  );
};

export default ErrorBox;
