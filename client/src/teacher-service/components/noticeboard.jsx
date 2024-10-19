import React, { useState } from 'react'
import { Presentation } from 'lucide-react'
import {
  AccordionTitle,
  AccordionContent,
  Accordion,
  Icon,
} from 'semantic-ui-react'

const Noticeboard = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  return (
    <>
      <div className='noticeHeader'>
        <Presentation size={20} color='#007BFE' />
        <h6>Notice Board</h6>
      </div>
      <div className="noticeContent">
        <Accordion fluid styled>
          <AccordionTitle
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            What is a dog?
          </AccordionTitle>
          <AccordionContent active={activeIndex === 0}>
            <p>
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </p>
          </AccordionContent>

          <AccordionTitle
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            What kinds of dogs are there?
          </AccordionTitle>
          <AccordionContent active={activeIndex === 1}>
            <p>
              There are many breeds of dogs. Each breed varies in size and
              temperament. Owners often select a breed of dog that they find to be
              compatible with their own lifestyle and desires from a companion.
            </p>
          </AccordionContent>

          <AccordionTitle
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            How do you acquire a dog?
          </AccordionTitle>
          <AccordionContent active={activeIndex === 2}>
            <p>
              Three common ways for a prospective owner to acquire a dog is from
              pet shops, private owners, or shelters.
            </p>
            <p>
              A pet shop may be the most convenient way to buy a dog. Buying a dog
              from a private owner allows you to assess the pedigree and
              upbringing of your dog before choosing to take it home. Lastly,
              finding your dog from a shelter helps give a good home to a dog who
              may not find one so readily.
            </p>
          </AccordionContent>
        </Accordion>
      </div>
    </>
  )
}

export default Noticeboard