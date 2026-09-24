import { mergeAttributes, Node } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import TiptapImage from "@tiptap/extension-image";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pullQuote: {
      togglePullQuote: () => ReturnType;
    };
    linkCard: {
      insertLinkCard: (attrs: { url: string; label: string }) => ReturnType;
    };
  }
}

/**
 * A visually distinct blockquote for pull quotes. Extends the standard
 * blockquote node under a different name/command so it doesn't collide
 * with StarterKit's own toggleBlockquote command.
 */
export const PullQuote = Blockquote.extend({
  name: "pullQuote",
  parseHTML() {
    return [{ tag: "blockquote.pull-quote" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(HTMLAttributes, { class: "pull-quote" }),
      0,
    ];
  },
  addCommands() {
    return {
      togglePullQuote:
        () =>
        ({ commands }) =>
          commands.toggleWrap(this.name),
    };
  },
});

/**
 * Images that render as <figure><img><figcaption> when a caption is set,
 * so a caption can be attached without a separate editable node/view.
 */
export const FigureImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: { default: null },
    };
  },
  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs: (dom) => {
          if (typeof dom === "string") return false;
          const img = dom.querySelector("img");
          if (!img) return false;
          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            title: img.getAttribute("title"),
            caption: dom.querySelector("figcaption")?.textContent ?? null,
          };
        },
      },
      { tag: "img[src]" },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const rest = { ...HTMLAttributes };
    delete rest.caption;
    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, rest);
    if (!node.attrs.caption) {
      return ["img", imgAttrs];
    }
    return [
      "figure",
      {},
      ["img", imgAttrs],
      ["figcaption", {}, node.attrs.caption],
    ];
  },
});

/**
 * A small bordered link-preview card, used for embeds (Twitter/X, GitHub
 * Gist attribution) that we deliberately don't render as live third-party
 * scripts or iframes.
 */
export const LinkCard = Node.create({
  name: "linkCard",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      url: { default: null },
      label: { default: "View link" },
    };
  },
  parseHTML() {
    return [
      {
        tag: "div.link-card",
        getAttrs: (dom) => {
          if (typeof dom === "string") return false;
          const anchor = dom.querySelector("a");
          if (!anchor) return false;
          return {
            url: anchor.getAttribute("href"),
            label: (anchor.textContent ?? "View link").replace(/\s*↗\s*$/, ""),
          };
        },
      },
    ];
  },
  renderHTML({ node }) {
    return [
      "div",
      { class: "link-card" },
      [
        "a",
        { href: node.attrs.url, target: "_blank", rel: "noopener noreferrer" },
        `${node.attrs.label} ↗`,
      ],
    ];
  },
  addCommands() {
    return {
      insertLinkCard:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});
