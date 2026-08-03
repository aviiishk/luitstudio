"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import TiptapImage from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Redo,
  Undo,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  createPost,
  updatePost,
  type PostInput,
} from "@/app/admin/(dashboard)/blog/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ButtonAction } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/utils/slugify";

interface PostEditorValues {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

type PostEditorFormProps =
  | { mode: "create" }
  | { mode: "edit"; postId: string; initial: PostEditorValues };

const emptyValues: PostEditorValues = {
  title: "",
  slug: "",
  excerpt: "",
  contentHtml: "",
  coverImage: "",
  tags: "",
  published: false,
};

const toolbarButtonClasses =
  "text-body hover:bg-surface hover:text-ink aria-pressed:bg-brand/10 aria-pressed:text-brand grid size-8 place-items-center rounded-lg transition-colors disabled:pointer-events-none disabled:opacity-40";
const inputClasses =
  "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClasses = "text-ink mb-2 block text-sm font-medium";

export function PostEditorForm(props: PostEditorFormProps) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.initial : emptyValues;

  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugEdited, setSlugEdited] = useState(props.mode === "edit");
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [coverImage, setCoverImage] = useState(initial.coverImage);
  const [tags, setTags] = useState(initial.tags);
  const [published, setPublished] = useState(initial.published);
  const [error, setError] = useState("");
  const [contentImageError, setContentImageError] = useState("");
  const [isUploadingContentImage, setIsUploadingContentImage] =
    useState(false);
  const [isPending, startTransition] = useTransition();
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
      TiptapImage,
    ],
    content: initial.contentHtml,
    editorProps: {
      attributes: { class: "blog-prose min-h-80 focus:outline-none" },
      handleDrop(view, event, _slice, moved) {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter(
          (file) => file.type.startsWith("image/"),
        );
        if (files.length === 0) return false;

        event.preventDefault();
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        const insertPos = coordinates?.pos ?? view.state.selection.from;

        files.forEach((file) => {
          setIsUploadingContentImage(true);
          uploadImageToCloudinary(file)
            .then((url) => {
              const node = view.state.schema.nodes.image.create({ src: url });
              view.dispatch(view.state.tr.insert(insertPos, node));
            })
            .catch(() => setContentImageError("Image upload failed."))
            .finally(() => setIsUploadingContentImage(false));
        });

        return true;
      },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter(
          (file) => file.type.startsWith("image/"),
        );
        if (files.length === 0) return false;

        files.forEach((file) => {
          setIsUploadingContentImage(true);
          uploadImageToCloudinary(file)
            .then((url) => {
              const node = view.state.schema.nodes.image.create({ src: url });
              view.dispatch(view.state.tr.replaceSelectionWith(node));
            })
            .catch(() => setContentImageError("Image upload failed."))
            .finally(() => setIsUploadingContentImage(false));
        });

        return true;
      },
    },
  });

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setTitle(next);
    if (!slugEdited) setSlug(slugify(next));
  }

  function addLink() {
    if (!editor) return;
    const url = window.prompt("Link URL");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function handleContentImageSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor) return;

    setContentImageError("");
    setIsUploadingContentImage(true);
    try {
      const url = await uploadImageToCloudinary(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      setContentImageError("Image upload failed.");
    } finally {
      setIsUploadingContentImage(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;

    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    const input: PostInput = {
      title,
      slug,
      excerpt,
      content: editor.getHTML(),
      coverImage,
      tags,
      published,
    };

    setError("");
    startTransition(async () => {
      const result =
        props.mode === "create"
          ? await createPost(input)
          : await updatePost(props.postId, input, props.initial.published);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      <div>
        <label htmlFor="title" className={labelClasses}>
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className={`${inputClasses} text-base font-medium`}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClasses}>
          Slug
        </label>
        <div className="flex items-center gap-2">
          <span className="text-body shrink-0 text-sm">/blog/</span>
          <input
            id="slug"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(event.target.value);
            }}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ImageUploadField
          label="Cover image"
          value={coverImage}
          onChange={setCoverImage}
        />
        <div>
          <label htmlFor="tags" className={labelClasses}>
            Tags (comma separated)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Design, Product"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClasses}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={2}
          className={`${inputClasses} resize-y`}
          placeholder="Short summary shown on the blog listing…"
        />
      </div>

      <div>
        <span className={labelClasses}>Content</span>
        <div className="border-border overflow-hidden rounded-xl border">
          <div className="border-border bg-surface flex flex-wrap items-center gap-1 border-b px-2 py-1.5">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              aria-pressed={editor?.isActive("bold")}
              className={toolbarButtonClasses}
              aria-label="Bold"
            >
              <Bold aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              aria-pressed={editor?.isActive("italic")}
              className={toolbarButtonClasses}
              aria-label="Italic"
            >
              <Italic aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              aria-pressed={editor?.isActive("heading", { level: 2 })}
              className={toolbarButtonClasses}
              aria-label="Heading 2"
            >
              <Heading2 aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              aria-pressed={editor?.isActive("heading", { level: 3 })}
              className={toolbarButtonClasses}
              aria-label="Heading 3"
            >
              <Heading3 aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              aria-pressed={editor?.isActive("bulletList")}
              className={toolbarButtonClasses}
              aria-label="Bullet list"
            >
              <List aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              aria-pressed={editor?.isActive("orderedList")}
              className={toolbarButtonClasses}
              aria-label="Numbered list"
            >
              <ListOrdered aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              aria-pressed={editor?.isActive("blockquote")}
              className={toolbarButtonClasses}
              aria-label="Quote"
            >
              <Quote aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={addLink}
              aria-pressed={editor?.isActive("link")}
              className={toolbarButtonClasses}
              aria-label="Add link"
            >
              <LinkIcon aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => contentImageInputRef.current?.click()}
              disabled={isUploadingContentImage}
              className={toolbarButtonClasses}
              aria-label="Insert image"
            >
              {isUploadingContentImage ? (
                <Loader2 aria-hidden="true" size={16} className="animate-spin" />
              ) : (
                <ImageIcon aria-hidden="true" size={16} />
              )}
            </button>
            <input
              ref={contentImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => void handleContentImageSelected(event)}
            />
            <span className="bg-border mx-1 h-5 w-px" aria-hidden="true" />
            <button
              type="button"
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              className={toolbarButtonClasses}
              aria-label="Undo"
            >
              <Undo aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              className={toolbarButtonClasses}
              aria-label="Redo"
            >
              <Redo aria-hidden="true" size={16} />
            </button>
          </div>
          <div className="bg-white px-4 py-3">
            <EditorContent editor={editor} />
          </div>
        </div>
        <p className="text-body mt-2 text-xs">
          Drag and drop or paste an image directly into the post to insert it
          inline.
        </p>
        {contentImageError ? (
          <p className="text-rose-ink mt-1 text-sm">{contentImageError}</p>
        ) : null}
      </div>

      <div className="border-border flex items-center justify-between rounded-xl border bg-white p-4">
        <div>
          <p className="text-ink text-sm font-medium">Publish post</p>
          <p className="text-body mt-0.5 text-xs">
            Make this visible on the public blog
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPublished((prev) => !prev)}
          role="switch"
          aria-checked={published}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
            published ? "bg-brand" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
              published ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {error ? <p className="text-rose-ink text-sm">{error}</p> : null}

      <div className="flex items-center gap-3">
        <ButtonAction type="submit" variant="brand" disabled={isPending}>
          {isPending
            ? "Saving…"
            : props.mode === "create"
              ? "Create post"
              : "Save changes"}
        </ButtonAction>
      </div>
    </form>
  );
}
