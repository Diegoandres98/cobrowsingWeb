/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import User from './User';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, TextField, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import ListCardTableWrapper from '../collector/ListCardTableWrapper';
import TableCredit from '../../components/table';
import { useEffect } from 'react';
import { useState } from 'react';

import { listCredit } from 'services/credits.service';
import { listCollector } from 'services/collector.services';
//import { listRoutes } from 'services/routes.service'; 

//import { minWidth } from '@mui/system';

/*function CreateRuta() {*/

/*
  ///
  const [collector, setCollector] = useState([]);

  useEffect(() => {
    const array = async () => {
      try {
        const datosObtenidos = await listCollector(1,1000);
        setCollector(datosObtenidos);
      } catch (error) {
        console.error('Error al obtener los datos:',collector, error);
      }
    };

    array();
  }, []);


  ///
/*
  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
*/

const columns = [
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'client_name', label: 'Nombre', minWidth: 170 },
  { id: 'collectionAddress', label: 'Direccion', minWidth: 100 },
  { id: 'occupation', label: 'Ocupation', minWidth: 100 },
  { id: 'borrowedValue', label: 'Valor', minWidth: 100 }
];

// ===============================|| AUTH3 - REGISTER ||=============================== //

const CreateRuta = () => {
 
 /* const [people, setPeople] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Sarah' },
    { id: 3, name: 'Paul' }
  ]);*/

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('active', active.id);
    console.log('over', over.id);

    if (!active.id !== over.id) {
      setCredit((credit) => {
        const oldIndex = credit.findIndex((person) => person.id === active.id);
        const newIndex = credit.findIndex((person) => person.id === over.id);

        console.log(arrayMove(credit, oldIndex, newIndex));
        return arrayMove(credit, oldIndex, newIndex);
      });
    }

    console.log('drag end');
  };

  const [value, setValue] = useState(null);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [itemList, setItemList] = useState({
    page: 1,
    itemsForPage: 10
  });

  const [collector, setCollector] = useState([]);
  const [credit, setCredit] = useState([]);
  const [openModal, setOpenModal] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

  const [itemForPage, setItemForPage] = useState({
    itemsForPage: 10,
    page: 1,
    total: 0,
    totalPages: 0
  });

  const [openDialog, setOpenDialog] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

  useEffect(() => {
    listCollector(1, 10000).then((r) => {
      setCollector(r.collectorss);
      setValue(r.collectorss[0].id);
    });

    if (value !== null) {
      listCredit(itemList.page, itemList.itemsForPage, value).then((r) => {
        const valAnteriorItemsForPage = itemForPage.itemsForPage;

        setItemForPage({
          itemsForPage: r.itemsForPage,
          page: r.page,
          total: r.total,
          totalPages: r.totalPages
        });
        //add nuevo consumo, a la tabla
        if (valAnteriorItemsForPage !== r.itemsForPage) {
          setCredit(r.creditssDto);
          return;
        }
        const rS = credit.concat(r.creditssDto);
        setCredit(rS);
      });
    }
  }, [itemList]);

  useEffect(() => {
    if (value !== null) {
      listCredit(itemList.page, itemList.itemsForPage, value).then((r) => {
        const valAnteriorItemsForPage = itemForPage.itemsForPage;

        setItemForPage({
          itemsForPage: r.itemsForPage,
          page: r.page,
          total: r.total,
          totalPages: r.totalPages
        });
        //add nuevo consumo, a la tabla
        if (valAnteriorItemsForPage !== r.itemsForPage) {
          setCredit(r.creditssDto);
          return;
        }

        setCredit(r.creditssDto);
      });
    }
  }, [value]);

  const controllerPagination = ({ page, rowsPerPage }) => {
    if (itemForPage.itemsForPage !== rowsPerPage) {
      setItemList({
        itemsForPage: rowsPerPage,
        page: 1
      });
    }
    if (itemList.page > page) {
      return;
    }
    setItemList({
      itemsForPage: rowsPerPage,
      page: page + 1
    });
  };

  const openModalFunc = (type, row) => {
    console.log('id press' + JSON.stringify(row));
    if (type === 'add-delete') {
      setOpenModal({
        ...openModal,
        status: true,
        itemSelected: row.id,
        statusItemSelected: row.status
      });
    }
    if (type === 'edit') {
      setOpenDialog({
        ...openDialog,
        status: true,
        itemSelected: row.id,
        row
      });
    }
  };

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '1vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 0, sm: 3 }, mb: 0 }}>
              <ListCardTableWrapper>
                <Grid container alignItems="left">
                  <h4>Collector: </h4>
                  {collector.length > 0 && (
                    <TextField
                      id="standard-select-currency"
                      select
                      value={value === null ? collector[0].id : value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      {collector.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.username}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>
       
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Ajustar Ruta
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  </Grid>


                <Grid>
          <div className="flex justify-center items-center">
            <div className="w-4/6">
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={credit} strategy={verticalListSortingStrategy}>
                  {credit.map((user) => (
                    <User key={credit.id} user={user} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </Grid>

       
                  <Grid item xs={12}>
                    {credit.length > 0 && (
                      <TableCredit
                        columns={columns}
                        rows={credit}
                        itemForPage={itemForPage}
                        callback={openModalFunc}
                        controllerPagination={controllerPagination}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                
              </ListCardTableWrapper>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </AuthWrapper1>
  );
};
/*

return (
  <AuthWrapper1>
                          Listado de cobradores
                          {collector.length > 0 && (
                                <TextField
                                  id="standard-select-currency"
                                  select
                                  value={value === null ? collector[0].id : value}
                                  onChange={(e) => setValue(e.target.value)}
                                >
                                  {collector.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.username}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
           
  </AuthWrapper1>
);
}
*/
export default CreateRuta;
