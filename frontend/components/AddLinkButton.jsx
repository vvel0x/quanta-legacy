import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { nanoid } from "nanoid";
import { useSWRConfig } from "swr";

const AddLinkButton = ({ disabled, prefix, select }) => {
  const { mutate } = useSWRConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [URL, setURL] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState(nanoid(7));
  const [errors, setErrors] = useState({});

  const handleToggle = () => setIsOpen(!isOpen);

  const handleNew = () => {
    setErrors({});
    setURL("");
    setSlug(nanoid(7));
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!name.length > 0) return setErrors({ ...errors, name: true });
    if (!URL.length > 0) return setErrors({ ...errors, url: true });
    if (!slug.length > 0) return setErrors({ ...errors, slug: true });

    setIsSubmitting(true);

    const addLink = await fetch("/api/slugs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, url: URL, slug: slug }),
    });

    if (!addLink.ok) setErrors({ ...errors, submit: true });
    setIsSubmitting(false);

    //If successful, close modal and refresh list
    mutate("/api/slugs");
    setIsOpen(false);
    select({ slug: slug, name: name });
  };

  const style =
    "w-full leading-tight focus:outline-none focus:shadow-outline border border-blue-200 rounded-md whitespace-nowrap text-gray-700 py-2 px-3 text-sm";

  return (
    <>
      <Button disabled={disabled} handleClick={handleNew}>
        New Link
      </Button>
      <Modal show={isOpen} toggle={handleToggle}>
        {errors?.submit ? (
          <p className="text-red-600">Unable to add link!</p>
        ) : (
          <>
            <form
              className="flex flex-col w-80"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  name="name"
                  className={style}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Google"
                />
                {errors?.name && (
                  <span className="text-red-600 text-xs">
                    Name cannot be empty!
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="url"
                >
                  Original URL
                </label>
                <input
                  name="url"
                  className={style}
                  onChange={(e) => setURL(e.target.value)}
                  type="text"
                  placeholder="https://www.google.com"
                />
                {errors?.url && (
                  <span className="text-red-600 text-xs">
                    URL cannot be empty!
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="slug"
                >
                  Slug
                </label>
                <input
                  name="slug"
                  className={style}
                  onChange={(e) => setSlug(e.target.value)}
                  type="text"
                  placeholder={slug}
                />
                <p className="text-xs text-gray-700 mt-1">
                  <span className="font-medium">Short URL: </span>http://
                  {prefix}/{slug}
                </p>
                {errors?.slug && (
                  <span className="text-red-600 text-xs">
                    Name cannot be empty!
                  </span>
                )}
              </div>
            </form>
            <div className="mx-auto flex gap-x-2">
              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-3 py-2 bg-white border border-gray-300 hover:border-pink-300 hover:text-pink-600 text-sm font-semibold rounded-sm transition ease-in-out duration-100"
              >
                {isSubmitting ? "Adding" : "Add"}
              </button>
              <Button handleClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddLinkButton;
