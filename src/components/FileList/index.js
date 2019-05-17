import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import {
  MdCheckCircle, MdError, MdLink, MdFileDownload,
} from 'react-icons/md';

import PropTypes from 'prop-types';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files, onDelete, setStateDoPapaizineo }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              há
              {' '}
              {distanceInWords(uploadedFile.createdAt, new Date(), {
                locale: pt,
              })}
              {' '}
              {uploadedFile.readableSize}
              {' '}
              {!!uploadedFile.url && (
                <div>
                  <button onClick={() => setStateDoPapaizineo(uploadedFile)}>Excluir</button>
                </div>
              )}
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7159c1' },
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}

          {uploadedFile.url && (
            <a
              download={uploadedFile.name}
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdFileDownload style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.url && (
            <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

FileList.propTypes = {
  valorDoPapaizineo: PropTypes.string.isRequired,
  setStateDoPapaizineo: PropTypes.func.isRequired,
};

export default FileList;
