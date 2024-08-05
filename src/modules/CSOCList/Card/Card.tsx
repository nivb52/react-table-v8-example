import React from 'react';
// css
import styles from './Card.module.css';
// config
import config from 'src/config';
// Components
import { PinButton, WarningButton } from 'src/modules/common/Button/IconButton';
// store & context & utils
import { useCardContext } from 'src/modules/CSOCList/Card/CardContext';
import { colorByStatus } from 'src/modules/CSOCList/helpers';
// type
import type { RowPinningPosition } from '@tanstack/react-table';
import type { Tcsoc } from 'src/modules/CSOCList/types';
import { dateFormatter } from 'src/utils/formatters';

export interface Props {
  testId?: string;
  data: Tcsoc;
  isPinned: RowPinningPosition;
  doPin: () => void;
  unPin: () => void;
}

// ============ CMP =============
export function Card({ data, isPinned, doPin, unPin }: Props): JSX.Element {
  const [isExpended, setIsExpended] = React.useState(false);
  const { bookmarkCount, setBookmarkCount, maxAllwedBookmarkCards: maxAllowedBookmarkCards } = useCardContext();

  const navigateToSocList = (): void => {
    console.log('navigate');
  };

  return (
    <div
      /* eslint-disable @typescript-eslint/restrict-plus-operands */
      className={styles.content + ' ' + 'CSOC-Card__content'}
      onClick={() => (isExpended ? undefined : setIsExpended(!isExpended))}
      onDoubleClick={() => (isExpended ? navigateToSocList() : undefined)}
      onMouseLeave={() => (isExpended ? setIsExpended(!isExpended) : undefined)}
      style={{
        borderColor: `${colorByStatus[data.status]}`,
        minWidth: isExpended ? 'calc(calc(var(--csoc-card-width) * 2) + var(--csoc-card-column-gap))' : undefined,
        maxWidth: isExpended ? 'calc(calc(var(--csoc-card-width) * 2) + var(--csoc-card-column-gap))' : undefined,
        animation: 'cardPin 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both'
      }}
      /* eslint-disable @typescript-eslint/restrict-plus-operands */
      {...(isExpended ? { 'data-expended': true } : {})}
    >
      <div className={styles.part__top + ' ' + 'CSOC-Card__top'}>
        <div className={styles.titles} {...(isExpended ? { 'data-expended': true } : {})}>
          <div className={styles['title-main']} {...(isExpended ? { 'data-expended': true } : {})}>
            <span className='CSOC-Card__csoc_name cut-text' style={{ width: isExpended ? 'fit-content' : 98 }}>
              {data.name}
              {/**
                 * @note use html & style in  a way the highlited text
                 * will be kept between changes of card width and content (expended or not)
                 */}
              <span style={{ display: isExpended ? 'inline' : 'none' }}>
                <span> - </span>
                <span style={{ color: `${colorByStatus[data.status]}` }}>{data.status}</span>
              </span>
            </span>
            <span className={styles.titles__version_number}>{data.version}</span>
          </div>

          {isExpended ? (
            <div className={styles['title-extra']} {...{ 'data-expended': true }}>
              <span className='CSOC-Card__warning_type'>
                {$t('', 'Warning:')} {data.warningType}
              </span>
              <span className='CSOC-Card__socs_count'>
                {$t('', 'Enable Soc’s:')} {data.socs}
              </span>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.signals}>
          <div className={styles.signal__pin}>
            {isPinned ? (
              <PinButton
                size='small'
                onClick={(ev: any): void => {
                  ev.stopPropagation();
                  unPin();
                  setBookmarkCount((count) => count - 1);
                }}
                iconButtonColors={{ color: '#AFBDD1' }}
              />
            ) : (
              <PinButton
                size='small'
                onClick={(ev: any): void => {
                  ev.stopPropagation();
                  if (bookmarkCount > maxAllowedBookmarkCards) {
                    console.log('max bookmark cards excedded');
                    return;
                  }
                  doPin();
                  setBookmarkCount((count) => count + 1);
                }}
                hidden={bookmarkCount > maxAllowedBookmarkCards}
                iconButtonColors={{ color: '#313C4E' }}
                style={{ opacity: bookmarkCount > maxAllowedBookmarkCards ? 0 : 1 }}
              />
            )}
          </div>

          <div className={styles.signal__warn} {...(isExpended ? { 'data-expended': true } : {})}>
            {data.isWarn ? (
              <WarningButton
                size='small'
                iconButtonColors={{ color: 'var(--Color-Charts-Groups-Spoofing)' }}
              />
            ) : (
              <WarningButton size='small' disabled style={{ opacity: 0 }} />
            )}
          </div>
        </div>
      </div>

      {isExpended ? (
        <div className={styles.part__info} {...{ 'data-expended': true }}>
          <div>
            <span>{$t('', 'Type')}:</span>
            <span>{$t('', 'Amount')}: </span>
            <span>{$t('', 'Last update')}:</span>
          </div>
          <DataDisplayExpended label={$t('', 'Cases')} value={data.cases} date={data.casesUpdateDateTime} />
          <DataDisplayExpended label={$t('', 'Raw Data')} value={data.rawData} date={data.rawDataUpdateDateTime} />
          <DataDisplayExpended label={$t('', 'Files')} value={data.files} date={data.filesUpdateDateTime} />
        </div>
      ) : (
        <div className={styles.part__info + ' ' + 'CSOC-Card__part-info'}>
          <DataDisplay label={$t('', 'Cases')} value={data.cases} />
          <DataDisplay label={$t('', 'Raw Data')} value={data.rawData} />
          <DataDisplay label={$t('', 'Files')} value={data.files} />
        </div>
      )}
    </div>
  );
}

interface DataDisplayExpendedProps {
  label: string;
  value: number | string;
  date: Date | number | string;
}

const DataDisplayExpended: React.FC<DataDisplayExpendedProps> = ({ label, value, date }) => {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
      <span>{dateFormatter(date, config.dateTimeFormats.shortDateTime)}</span>
    </div>
  );
};

interface DataDisplayProps {
  label: string;
  value: number | string;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ label, value }) => {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
