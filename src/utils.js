import _ from "lodash"

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
          { label: "italic", value: "p-italic", disabled: false },
          { label: "bold", value: "p-bold", disabled: false },
          { label: "bold-italic", value: "p-bold-italic", disabled: false },
          { label: "default", value: "p-default", disabled: false },
        ],
        current: { label: "default", value: "p-default", disabled: false },
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
          { label: "h1", value: "h1", disabled: false },
          { label: "h2", value: "h2", disabled: false },
          { label: "h3", value: "h3", disabled: false },
          { label: "h4", value: "h4", disabled: false },
          { label: "h5", value: "h5", disabled: false },
          { label: "h6", value: "h6", disabled: false },
        ],
        current: { label: "h1", value: "h1", disabled: false },
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
          { label: "js", value: "js", disabled: false },
          { label: "css", value: "css", disabled: false },
          { label: "html", value: "html", disabled: false },
        ],
        current: { label: "html", value: "html", disabled: false },
      },
    },
  },
  {
    id: "4",
    type: "code-group",
    availableCodeTypes: ["html", "css", "js", "jsx"],
    content: [
      { codeType: "html", codeValue: "<h1>Hello</h1>" },
      { codeType: "js", codeValue: "const a = 4;" },
    ],
    options: [
      {
        clickables: [],
        selectionTabs: {
          values: [
            { label: "js", value: "js", disabled: false },
            { label: "css", value: "css", disabled: false },
            { label: "html", value: "html", disabled: false },
          ],
          current: { label: "html", value: "html", disabled: false },
        },
      },
      {
        clickables: [],
        selectionTabs: {
          values: [
            { label: "js", value: "js", disabled: false },
            { label: "css", value: "css", disabled: false },
            { label: "html", value: "html", disabled: false },
          ],
          current: { label: "JS", value: "js", disabled: false },
        },
      },
    ],
  },
]

export const getObjWithUpdatedCodeType = (obj, currentType, targetType) => {
  const clonedObj = _.cloneDeep(obj)
  //update type in content
  const objIndex = clonedObj.content.reduce((item, cu, i) => {
    if (cu.codeType === currentType) {
      item = i
    }
    return item
  }, null)
  clonedObj.content[objIndex].codeType = targetType
  // //update type in selection tab
  clonedObj.options[objIndex].selectionTabs.current.label = targetType
  clonedObj.options[objIndex].selectionTabs.current.value = targetType
  return clonedObj
}

export const getObjectWithAddedGroupCodeItem = (obj, renderedTypes) => {
  const clonedObj = _.cloneDeep(obj)
  //decied on the type that should be added
  const targetType = _.difference(
    clonedObj.availableCodeTypes,
    renderedTypes
  )[0]
  //add the type with the code to the content
  clonedObj.content.push({ codeType: targetType, codeValue: "</>" })
  //add options to the created item
  clonedObj.options.push({
    clickables: [],
    selectionTabs: {
      values: [
        renderedTypes.map(i => ({ label: i, value: i, disabled: false })),
      ],
      current: { label: targetType, value: targetType, disabled: false },
    },
  })

  console.log({ clonedObj })
  return clonedObj
}
