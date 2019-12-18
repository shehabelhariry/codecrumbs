export const copy = str => {
  function listener(e) {
    e.clipboardData.setData("text/html", str)
    e.clipboardData.setData("text/plain", str)
    e.preventDefault()
  }
  document.addEventListener("copy", listener)
  document.execCommand("copy")
  document.removeEventListener("copy", listener)
  alert("copied")
}

export let blockTypes = [
  {
    id: "0",
    type: "paragraph",
    content: "Paragraph",
    options: {
      selectionTabs: {
        values: [
          { label: "italic", value: "p-italic" },
          { label: "bold", value: "p-bold" },
          { label: "bold-italic", value: "p-bold-italic" },
          { label: "default", value: "p-default" },
        ],
        current: { label: "default", value: "p-default" },
      },
      clickables: [
        {
          type: "<a/>",
          action: function() {
            let str = `<a target="_blank" href="link" >Value</a>`
            copy(str)
          },
        },
        {
          type: "<b/>",
          action: function() {
            let str = `<b>bold</b>`
            copy(str)
          },
        },
        {
          type: "<i/>",
          action: function() {
            let str = `<i>italic</i>`
            copy(str)
          },
        },
      ],
    },
  },
  {
    id: "1",
    type: "header",
    content: "Header",
    options: {
      clickables: [],
      selectionTabs: {
        values: [
          { label: "h1", value: "h1" },
          { label: "h2", value: "h2" },
          { label: "h3", value: "h3" },
          { label: "h4", value: "h4" },
          { label: "h5", value: "h5" },
          { label: "h6", value: "h6" },
        ],
        current: { label: "h1", value: "h1" },
      },
    },
  },
  {
    id: "3",
    type: "code",
    content: "</>",
    options: {
      clickables: [],
      selectionTabs: {
        values: [
          { label: "JS", value: "js" },
          { label: "CSS", value: "css" },
          { label: "HTML", value: "html" },
        ],
        current: { label: "HTML", value: "html" },
      },
    },
  },
  {
    id: "4",
    type: "code-group",
    content: [
      { codeType: "html", codeValue: "<h1>Hello</h1>" },
      { codeType: "js", codeValue: "const a = 4;" },
    ],
    options: [
      {
        clickables: [],
        selectionTabs: {
          values: [
            { label: "JS", value: "js" },
            { label: "CSS", value: "css" },
            { label: "HTML", value: "html" },
          ],
          current: { label: "HTML", value: "html" },
        },
      },
    ],
  },
]
