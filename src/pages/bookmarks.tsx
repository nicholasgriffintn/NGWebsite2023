import { useState } from 'react';
import type { NextPage } from 'next';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import dayjs from 'dayjs';

import config from '@src/config';
import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';
import ResponsiveImage from '@src/components/ResponsiveImage';

// TODO: Tidy all of this up

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(23 25 35 / 66%)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(23 25 35)',
    width: '90%',
    maxWidth: '780px',
  },
};

Modal.setAppElement('#modal-root');

const bookmarksClient = new GraphQLClient(config.bookmarksApi, {});

const BookmarksWidget = () => {
  const { isLoading, error, data } = useQuery(['get-bookmarks'], async () => {
    const { bookmarks } = await bookmarksClient.request(
      gql`
        query {
          bookmarks {
            id
            status
            subject
            recieved
            toName
            toAddress
            fromName
            fromAddress
            bookmark
            url
            title
            description
            screenshot
          }
        }
      `,
      {}
    );
    return bookmarks;
  });

  return (
    <div id="bookmarks-widget">
      {isLoading === true ? (
        <p>Please wait just one sec while the bookmarks load...</p>
      ) : error ? (
        <p>An error occurred while fetching the bookmarks.</p>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="item-cards">
              {data.map((bookmark) => {
                if (bookmark) {
                  return (
                    <div className="item-card item-card-half" key={`item-card-${bookmark.id}`}>
                      {bookmark.screenshot ? (
                        <div className="item-image">
                          <ResponsiveImage alt={bookmark.title} src={bookmark.screenshot} />
                        </div>
                      ) : null}
                      <div className="item-content">
                        <h3>{bookmark.title}</h3>
                        <div className="item-card__meta">
                          <small>
                            Saved: {dayjs(bookmark.recieved).format('dddd, MMMM D YYYY h:mm a')}
                          </small>
                        </div>
                        <p>{bookmark.description}</p>

                        <span className="item-card__actions">
                          <a
                            href={bookmark.url}
                            target="_blank"
                            className="button button-prime-inverted"
                            rel="noopener noreferrer"
                          >
                            Visit Bookmark
                          </a>
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <p>Sorry, I haven&apos;t saved any Bookmarks yet! Please come back later.</p>
          )}
        </>
      )}
    </div>
  );
};

const BookmarksAdminWidget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //eslint-disable-next-line no-console
    console.log(data);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalBookmark, setModalBookmark] = useState<{
    status?: string;
    screenshot?: string;
    description?: string;
    url?: string;
    title?: string;
  }>({});

  function openModal(bookmark) {
    setModalBookmark(bookmark);
    setIsOpen(true);
  }

  function closeModal() {
    setModalBookmark({});
    setIsOpen(false);
  }

  const { isLoading, error, data } = useQuery(['get-unverified-bookmarks'], async () => {
    const { unverifiedBookmarks } = await bookmarksClient.request(
      gql`
        query {
          unverifiedBookmarks {
            id
            status
            subject
            recieved
            toName
            toAddress
            fromName
            fromAddress
            bookmark
            url
            title
            description
            screenshot
          }
        }
      `,
      {}
    );
    return unverifiedBookmarks;
  });

  return (
    <div id="bookmarks-widget">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Bookmark"
      >
        <h2>Edit this bookmark</h2>
        {modalBookmark ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Title:</label>
              <input
                defaultValue={modalBookmark.title}
                {...register('title', { required: true })}
              />
              {errors.title && <span>A title is required</span>}
            </div>
            <div>
              <label>Description:</label>
              <textarea
                cols={6}
                defaultValue={modalBookmark.description}
                {...register('description', { required: true })}
              />
              {errors.description && <span>A description is required</span>}
            </div>
            <div>
              <label>URL:</label>
              <input defaultValue={modalBookmark.url} {...register('url', { required: true })} />
              {errors.url && <span>A url is required</span>}
            </div>
            <div>
              <label>Screenshot:</label>
              <input
                defaultValue={modalBookmark.screenshot}
                {...register('screenshot', { required: false })}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                defaultValue={modalBookmark.status}
                {...register('status', { required: true })}
              >
                <option>unverified</option>
                <option>verified</option>
                <option>deleted</option>
              </select>
            </div>

            <br></br>

            <input
              style={{
                marginRight: '10px',
              }}
              className="button button-prime"
              type="submit"
            />
            <button
              type="button"
              className="button button-prime-inverted"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
          </form>
        ) : (
          <p>No bookmark was selected!</p>
        )}
      </Modal>
      {isLoading === true ? (
        <p>Please wait just one sec while the bookmarks load...</p>
      ) : error ? (
        <p>An error occurred while fetching the bookmarks.</p>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="item-cards">
              {data.map((bookmark) => {
                if (bookmark && bookmark.bookmark) {
                  return (
                    <div className="item-card item-card-half" key={`item-card-${bookmark.id}`}>
                      {bookmark.screenshot ? (
                        <div className="item-image">
                          <ResponsiveImage alt={bookmark.title} src={bookmark.screenshot} />
                        </div>
                      ) : null}
                      <div className="item-content">
                        <h3>{bookmark.title}</h3>
                        <div className="item-card__meta">
                          <small>
                            Saved: {dayjs(bookmark.recieved).format('dddd, MMMM D YYYY h:mm a')}
                          </small>
                          <small>
                            From: {bookmark.fromName} ({bookmark.fromAddress})
                          </small>
                        </div>
                        <div className="item-card__tags">
                          <div
                            className={`tag tag-status-${
                              bookmark.status === 'verifed' ? 'good' : 'bad'
                            }`}
                          >
                            {bookmark.status}
                          </div>
                        </div>
                        <p>{bookmark.description}</p>

                        <span className="item-card__actions">
                          <button
                            type="button"
                            className="button button-prime"
                            style={{
                              marginRight: '10px',
                            }}
                            onClick={() => openModal(bookmark)}
                          >
                            Edit Bookmark
                          </button>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            className="button button-prime-inverted"
                            rel="noopener noreferrer"
                          >
                            Visit Bookmark
                          </a>
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <p>There are no bookmarks to approve!</p>
          )}
        </>
      )}
    </div>
  );
};

const Page: NextPage = () => {
  // TODO: Need to add state management
  const alreadyLoggedIn = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Metadata />
      <Wrap>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Edit Bookmark"
        >
          <h2>Submit a Bookmark</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Title:</label>
              <input {...register('title', { required: true })} />
              {errors.title && <span>A title is required</span>}
            </div>
            <div>
              <label>Description:</label>
              <textarea cols={6} {...register('description', { required: true })} />
              {errors.description && <span>A description is required</span>}
            </div>
            <div>
              <label>URL:</label>
              <input {...register('url', { required: true })} />
              {errors.url && <span>A url is required</span>}
            </div>

            <br></br>

            <input
              style={{
                marginRight: '10px',
              }}
              className="button button-prime"
              type="submit"
            />
            <button
              type="button"
              className="button button-prime-inverted"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
          </form>
        </Modal>
        <div>
          <Title>Bookmarks</Title>
          <p>Would you like to suggest a bookmark for me to look at?</p>
          <p>
            <button
              type="button"
              className="button button-prime-inverted"
              onClick={() => openModal()}
            >
              Submit a Bookmark
            </button>
          </p>
          {alreadyLoggedIn ? (
            <div className="admin-block">
              <h2>Bookmarks Admin</h2>
              <BookmarksAdminWidget />
              <hr></hr>
            </div>
          ) : null}
          <BookmarksWidget />
        </div>
      </Wrap>
    </>
  );
};

export default Page;
