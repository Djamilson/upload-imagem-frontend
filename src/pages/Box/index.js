/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import socket from 'socket.io-client';

import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from '../../services/api';

import GlobalStyle from '../../styles/global';
import logo from '../../assets/logo.svg';
import { Container, Boxcontainer, Content } from './styles';

import Upload from '../../components/Upload';
import FileList from '../../components/FileList';

import { ToastContainer, toast } from 'mdbreact';
import Modal from '../../components/Modal';

export default class Box extends Component {
  state = {
    uploadedFiles: {},
    total_arquvios: 0,
    show: false,
    papaizineo: '',
    nameDelete: '',
  };

  issoAlteraOMeuEstado = (value) => {
    this.showModal();
    this.setState({ papaizineo: value.id, nameDelete: value.name }); // atualizo o meu state
  };

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  async componentDidMount() {
    this.subscribeToNewFiles();

    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    await this.setState({ uploadedFiles: response.data });

    this.setState({
      uploadedFiles: {
        ...this.state.uploadedFiles,
        files: response.data.files.map(file => ({
          id: file._id,
          name: file.title,
          readableSize: filesize(file.size),
          preview: file.url,
          uploaded: true,
          url: file.url,
          createdAt: file.createdAt,
        })),
      },
      total_arquvios: this.calulaTotalArquivos(),
    });
  }

  calulaTotalArquivos = () => this.state.uploadedFiles.files.filter(uploadedFile => uploadedFile.file === undefined).length;

  // eslint-disable-next-line react/sort-comp
  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket('http://localhost:3333');
    // const io = socket('https://upload-arquivos-backend.herokuapp.com');
    io.emit('connectRoom', box);
    // removendo o file
    io.on('id', (data) => {
      console.log('================== Vou D E L E T E:', data);
      this.setState({
        uploadedFiles: {
          ...this.state.uploadedFiles,
          files: [
            ...this.state.uploadedFiles.files.filter(uploadedFile => uploadedFile.id !== data),
          ],
        },
        total_arquvios: this.calulaTotalArquivos(),
      });
    });

    io.on('file', (data) => {
      const {
        _id: id, title: name, size, url, createdAt,
      } = data;

      this.setState({
        uploadedFiles: {
          ...this.state.uploadedFiles,
          files: [
            {
              id,
              name,
              readableSize: filesize(size),
              preview: url,
              uploaded: true,
              url,
              createdAt,
            },
            ...this.state.uploadedFiles.files,
          ],
        },
        total_arquvios: this.calulaTotalArquivos(),
      });
    });
  };

  handleUpload = (files) => {
    const lista_uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      createdAt: file.createdAt,
    }));

    this.setState({
      uploadedFiles: {
        ...this.state.uploadedFiles,
        files: this.state.uploadedFiles.files.concat(lista_uploadedFiles),
      },
    });

    lista_uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: {
        ...this.state.uploadedFiles,
        files: [
          ...this.state.uploadedFiles.files
            .filter(uploadedFile => uploadedFile.progress !== 100)
            .map(uploadedFile => (id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile)),
        ],
      },
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();
    const box = this.props.match.params.id;

    data.append('file', uploadedFile.file, uploadedFile.file.name);

    api
      .post(`boxes/${box}/files`, data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .then(() => {
        this.setState({
          total_arquvios: this.calulaTotalArquivos(),
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    await api.delete(`/boxes/${this.state.uploadedFiles._id}/${id}`);
    this.setState({
      uploadedFiles: {
        ...this.state.uploadedFiles,
        files: [...this.state.uploadedFiles.files.filter(file => file.id !== id)],
      },
      total_arquvios: this.calulaTotalArquivos(),
    });
    this.showModal();
    toast.success('Arquivo removido com sucesso!', {
      position: 'top-right',
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const {
      uploadedFiles, total_arquvios, show, papaizineo, nameDelete,
    } = this.state;

    return (
      <Boxcontainer>
        <header>
          <img src={logo} alt="" />
          <h1>{uploadedFiles.title}</h1>
          <h3>
            Total de Arquivos:
            {total_arquvios}
          </h3>
        </header>

        <Container>
          <Content>
            <Upload onUpload={this.handleUpload} />

            {!!uploadedFiles.files && (
              <FileList
                files={uploadedFiles.files}
                onDelete={this.handleDelete}
                onClose={this.showModal}
                show={show}
                valorDoPapaizineo={papaizineo}
                setStateDoPapaizineo={this.issoAlteraOMeuEstado}
              />
            )}

            <Modal
              onClose={this.showModal}
              valorDoPapaizineo={this.state.papaizineo}
              show={this.state.show}
              nameDelete={nameDelete}
              onDelete={() => this.handleDelete(papaizineo)}
            >
        Tem certeza que deseja deletar esse registro?
            </Modal>

            <ToastContainer hideProgressBar newestOnTop autoClose={5000} />
          </Content>
          <GlobalStyle />
        </Container>
      </Boxcontainer>
    );
  }
}
