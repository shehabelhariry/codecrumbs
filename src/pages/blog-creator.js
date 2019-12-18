import React, { useState, useRef } from "react"
import Layout from "../components/Layout"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import _ from "lodash"
import EditorBlockItem from "../components/EditorBlockItem/EditorBlockItem"
import Button from "../components/Button/Button"
import { copy, blockTypes } from "./utils"

import "./blog-creator.scss"

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
  const [items] = useState(blockTypes)
  const [selected, setSelected] = useState([])

  const formatAndCopyArticle = () => {
    const typesMapper = {
      blockquote: item => {
        return `<br><iframe><blockquote>${item.content}</blockquote></iframe>`
      },
      header: item => {
        const subType = item.options.selectionTabs.current.value
        return `<${subType}>${item.content}</${subType}>`
      },
      paragraph: item => {
        return `<p>${item.content}</p>`
      },
      code: item => {
        return `<code><iframe>${item.options.selectionTabs.current.value}::
${item.content}</iframe></code>

`
      },
    }
    let result = _.cloneDeep(selected).map(selectedItem => {
      return typesMapper[selectedItem.type](selectedItem)
    })
    let str = result.join("")
    copy(str)
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
                                {item.type !== "code-group"
                                  ? item.content
                                  : "</> group"}
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
                <Button
                  style={{ justifySelf: "end", marginTop: 20 }}
                  onClick={formatAndCopyArticle}
                >
                  Copy & Export
                </Button>
              </div>
            </DragDropContext>
          </div>
        )
      }}
    </Layout>
  )
}

export default BlogCreator
