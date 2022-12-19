import { useQuery } from '@tanstack/react-query';

import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';
import AdjustableLink from '@src/components/AdjustableLink';

const baseUrl = {
  development: 'http://localhost:3000',
  production: 'https://nicholasgriffin.dev',
}[process.env.NODE_ENV];

function fetchGithub(limit = 4, offset = 1) {
  return fetch(`${baseUrl}/api/github${`?limit=${limit}&offset=${offset}`}`)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
}

const GithubWidget = ({ limit = 8, offset = 1, widKey = 'github_hp' }) => {
  const { isLoading, error, data } = useQuery([widKey], () => fetchGithub(limit, offset));

  return (
    <div className="github-widget">
      {isLoading === true ? (
        <p>Please wait just one sec while the projects load...</p>
      ) : error ? (
        <p>An error occurred while fetching the projects.</p>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="item-cards">
              {data.map((repo) => {
                return (
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-card"
                    key={`item-card-${repo.id}`}
                    data-github={repo.full_name}
                  >
                    <div className="item-content">
                      <h3>{repo.name}</h3>
                      <p>{repo.description}</p>
                      {repo.language ? (
                        <span className="item-card__meta">
                          <span
                            className="item-card__language-icon"
                            style={{
                              color:
                                repo.language === 'JavaScript'
                                  ? '#f7df1c'
                                  : repo.language === 'PHP'
                                  ? '#777bb4'
                                  : repo.language === 'HTML'
                                  ? '#e34f25'
                                  : repo.language === 'Vue'
                                  ? '#42b883'
                                  : repo.language === 'Go'
                                  ? '#00ADD8'
                                  : repo.language === 'C++'
                                  ? '#f34b7d'
                                  : repo.language === 'C#'
                                  ? '#178600'
                                  : repo.language === 'Python'
                                  ? '#3572A5'
                                  : repo.language === 'TypeScript'
                                  ? '#2b7489'
                                  : repo.language === 'CSS'
                                  ? '#563d7c'
                                  : repo.language === 'Swift'
                                  ? '#F05138'
                                  : repo.language === 'Java'
                                  ? '#b07219'
                                  : repo.language === 'C'
                                  ? '#555555'
                                  : repo.language === 'Ruby'
                                  ? '#701516'
                                  : repo.language === 'CoffeeScript'
                                  ? '#244776'
                                  : repo.language === 'Rust'
                                  ? '#dea584'
                                  : repo.language === 'Dart'
                                  ? '#89e051'
                                  : repo.language === 'PowerShell'
                                  ? '#012456'
                                  : repo.language === 'Dockerfile'
                                  ? '#384d54'
                                  : repo.language === 'YAML'
                                  ? '#000'
                                  : '#fff',
                            }}
                          >
                            ●
                          </span>{' '}
                          {repo.language}
                        </span>
                      ) : null}
                    </div>
                  </a>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <>
      <Metadata />
      <Wrap>
        <div className="ng-prose ng-text-primary ng-mx-auto">
          <Title>Projects</Title>
          <p>
            It&apos;s my aim to spend a big percentage of my personal time on a number of projects.
          </p>
          <p>
            I often work on quite a few different things that you might find interesting, take a
            look at some of them below.
          </p>
          <p>
            You can also take a look at my{' '}
            <AdjustableLink href="/snippets">code snippets</AdjustableLink> for some of my quick
            fixes and tips.
          </p>
          <GithubWidget limit={100} />
        </div>
      </Wrap>
    </>
  );
}
