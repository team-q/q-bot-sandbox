import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';
import QuestionsList from './QuestionsList';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import CohortSort from '../CohortSort';
import ClaimSort from '../ClaimSort';

const filterClaimed = {
  claimed(TA) {
    return TA
  },
  unclaimed(TA) {
    return !TA
  },
  both(TA) {
    return true
  }
}

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = React.useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {!isShown && toggle(show)}
      {isShown && content(hide)}
    </>
  );
}

const Modal = ({ children }) => (
  ReactDOM.createPortal(
    <>
      {children}
    </>,
    document.getElementById('modal-root')
  )
);

export default function Questions({ providerData }) {
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('desc');
  const [cohortSortValue, setCohortSortValue] = useState('')
  const [claimSortValue, setClaimSortValue] = useState('both')

  const questions = useFirestore(questionCollection.orderBy('timestamp', sortValue), [], sortValue, cohortSortValue, claimSortValue)
    .filter(c => {
      return c.question.toLowerCase().includes(filterValue.toLowerCase()) && c.channelName.includes(cohortSortValue) && filterClaimed[claimSortValue](c.TA)
    })

  return (
    <>
      <h1 className={'center-align'}>Queue</h1>
      <ToggleContent
        toggle={show => (
          <button onClick={show} className={'toggle-button'}>Filter & Sort</button>
        )}
        content={hide => (
          <Modal>
            <button onClick={hide} className={'toggle-button'}>Close</button>
            <section className={'filter-and-sort'}>
              <fieldset>
                <legend>Filter</legend>
                <FilterForm value={filterValue} onChange={({ target }) => setFilterValue(target.value)} />
                <button className={'toggle-button filter'} onClick={({ target }) => setFilterValue(target.value)}>Clear</button>
              </fieldset>
              <fieldset className={'sort'}>
                <legend>Sort</legend>
                <p>
                  <SortForm handleChange={({ target }) => setSortValue(target.value)} />
                </p>
                <p>
                  <CohortSort onChange={({ target }) => { setCohortSortValue(target.value) }} />
                </p>
                <p>
                  <ClaimSort onChange={({ target }) => { setClaimSortValue(target.value) }} />
                </p>
              </fieldset>
            </section>
          </Modal>
        )}
      />
      <div id="modal-root"></div>
      <QuestionsList
        questions={questions}
        providerData={providerData}
      />
    </>
  )
}
