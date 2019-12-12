import React, { useState } from "react"
import Layout from "../components/Layout"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import _ from "lodash"
import "./blog-creator.scss"
import EditorBlockItem from "../components/EditorBlockItem/EditorBlockItem"
import Button from "../components/Button/Button"

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
})

const BlogCreator = () => {
  const [items, setItems] = useState([
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
      },
    },
    {
      id: "1",
      type: "header",
      content: "Header",
      options: {
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
      id: "2",
      type: "blockquote",
      content: "Blockquote",
      options: {
        selectionTabs: {
          values: [],
          current: { label: "blockquote", value: "blockquote" },
        },
      },
    },
  ])
  const [selected, setSelected] = useState([])

  const formatAndCopyArticle = () => {
    const typesMapper = {
      blockquote: props => {
        console.log(props)
        return <blockquote>{props}</blockquote>
      },
    }
    let result = _.cloneDeep(selected).map(selectedItem => {
      return typesMapper[selectedItem.type]()
    })

    console.log(result)

    return [...result]
  }

  const onDragEnd = result => {
    const { source, destination } = result
    if (
      destination &&
      destination.droppableId === "droppable2" &&
      destination.droppableId !== source.droppableId
    ) {
      const newSelected = _.cloneDeep(selected)
      newSelected.splice(destination.index, 0, {
        ...items.find(item => item.id === result.draggableId),
        id: `paragraph-${new Date().getTime()}`,
      })
      setSelected(newSelected)
    }

    if (
      destination &&
      destination.droppableId === "droppable2" &&
      destination.droppableId === source.droppableId
    ) {
      const newSelected = _.cloneDeep(selected)
      newSelected.splice(source.index, 1)
      newSelected.splice(
        destination.index,
        0,
        selected.find(selectedItem => selectedItem.id === result.draggableId)
      )

      setSelected(newSelected)
    }
  }
  return (
    <Layout>
      {isDark => {
        return (
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="blog-creator">
                <div className="blog-creator__tags">
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="blog-creator__blocks__block"
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="blog-creator__blocks__content">
                  <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {selected.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="blog-creator__blocks__editor-block"
                              >
                                <EditorBlockItem
                                  item={Object.assign({}, { ...item })}
                                  items={items}
                                  setSelected={setSelected}
                                  selected={selected}
                                  onSave={value => {
                                    const newSelected = _.cloneDeep(
                                      selected
                                    ).map(selectedItem => {
                                      if (selectedItem.id === item.id) {
                                        selectedItem.content = value
                                      }
                                      return selectedItem
                                    })
                                    setSelected(newSelected)
                                  }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div />
                {/* <Button
                  style={{ justifySelf: "end", marginTop: 20 }}
                  onClick={formatAndCopyArticle}
                >
                  Copy & Export
                </Button> */}
              </div>
            </DragDropContext>
          </div>
        )
      }}
    </Layout>
  )
}

export default BlogCreator
