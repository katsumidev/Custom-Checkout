import React, { useCallback, useEffect, useRef, useState } from "react";
import Switch from "../Switch";
import {
  Container,
  Background,
  ModalBox,
  Input,
  FormInput,
  FirstRow,
  OptionColumn,
  ColorPickerBtn,
  Popover,
  Row,
  EditLayoutBtn,
  TopBarDroppable,
  DraggableBanner,
  LayoutDrag,
  DragFiles,
  ModalHeader,
  SaveBtn,
  Banner,
  NotificationContainer,
  CustomHiddenInput,
  Cover,
  Dropdown,
  LayoutDragMobile,
  MobileEdit,
  DropzonesWrapper,
} from "./styles";
import { SketchPicker } from "react-color";
import { RiErrorWarningLine } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaPen, FaShoppingCart } from "react-icons/fa";
import InputMask from "react-input-mask";
import { CSS } from "@dnd-kit/utilities";
import { useSortable, rectIntersection } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AiFillCamera, AiOutlineInfoCircle } from "react-icons/ai";
import SortableItem from "../SortableItem";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

function EditModal(props) {
  const [checkoutArray, setCheckoutArray] = useState([]);
  const [isOpen, setIsOpen] = useState({
    mobile: false,
    desktop: false,
    product: false,
  });
  const [bannerType, setBannerType] = useState("");
  const [isEditingNotification, setIsEditingNotification] = useState({
    title: false,
    text: false,
  });
  const [editData, setEditData] = useState({});
  const [currentBanner, setCurrentBanner] = useState({
    top: "",
    side: "",
    topMobile: "",
    bottom: "",
  });

  const [isEditingLayout, setIsEditingLayout] = useState(false);

  const [colorPicker, setColorPicker] = useState({
    background: false,
    main_sub_color: false,
    page_text: false,
    product: false,
    product_text: false,
    secundary_text: false,
    tertiary_text: false,
  });

  const [colorValues, setColorValues] = useState({
    background: "#ED0B6E",
    main_sub_color: "#838385",
    page_text: "#000",
    product: "#F7F6F9",
    product_text: "#000",
    secundary_text: "#838385",
    tertiary_text: "#F1F0F5",
  });

  const [isActive, setIsActive] = useState({
    color: false,
    notification: false,
    timer: false,
    support: false,
  });

  const [items, setItems] = useState([
    "productDetails",
    "deliveryDetails",
    "sideBanner",
  ]);

  const [mobileItems, setMobileItems] = useState([
    "mobileDeliveryDetails",
    "mobileProductDetails",
    "mobileBanner",
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      setMobileItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    if (props.id !== "new") {
      const currentCheckoutArray = JSON.parse(
        localStorage.getItem("checkoutArray") || "[]"
      );

      setCheckoutArray(currentCheckoutArray);

      const currentCheckout = currentCheckoutArray.find(
        (item) => item.id == props.id
      );

      setColorValues({
        background: currentCheckout.accent_color,
        main_sub_color: currentCheckout.main_sub_color,
        page_text: currentCheckout.page_text,
        product: currentCheckout.product_background,
        product_text: currentCheckout.product_text,
        secundary_text: currentCheckout.secundary_text,
        tertiary_text: currentCheckout.tertiary_text,
      });
      setEditData(currentCheckout);
    } else {
      const currentCheckoutArray = JSON.parse(
        localStorage.getItem("checkoutArray") || "[]"
      );

      setEditData({
        id: `${currentCheckoutArray.length + 1}`,
        name: "",
        accent_color: "#ED0B6E",
        main_sub_color: "#838385",
        product_background: "#F7F6F9",
        product_text: "#000",
        page_text: "#000",
        secundary_text: "#838385",
        tertiary_text: "#F1F0F5",
        layout: [],
        mobile_layout: [],
        type: "custom",
        visits: 3,
        conclusions: 0,
        conversion_tax: 0,
        ask_for_email: true,
        is_timer_on: false,
        is_support_open: false,
        is_notification_open: false,
        is_digital: true,
        support_email: "mooncoded.bs@gmail.com",
        support_whatsapp: "5534996484068",
        timer_text: "Atenção!! A promoção acaba em:",
        timer_time: "05:00",
        banner_background:
          "https://app.logzz.com.br/uploads/imagens/checkout/_63d4519dd2cebescova_alisadora_TOPO.png",
        banner_side_background:
          "https://app.logzz.com.br/uploads/imagens/checkout/_63d4519dd2da0escova_alisadora_LATERAL.png",
        banner_background_mobile:
          "https://app.logzz.com.br/uploads/imagens/checkout/_63d4519dd2cebescova_alisadora_TOPO.png",
        banner_bottom_background_mobile:
          "https://app.logzz.com.br/uploads/imagens/checkout/_63d4519dd2da0escova_alisadora_LATERAL.png",
        notification_title: "Sou um titulo",
        notification_text: "Sou um texto",
        have_custom_page: false,
        custom_page_link: "",
        product_name: "",
        product_description: "",
        product_price: 0,
        accept_card: true,
        accept_billet: true,
        accept_pix: true,
        images: [],
      });
    }
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onDropBanner = useCallback((acceptedFiles, type) => {
    const file = Array.isArray(acceptedFiles)
      ? acceptedFiles[0]
      : acceptedFiles;

    let maxSize = 5 * 1024 * 1024;

    if (file.size <= maxSize) {
      getBase64(file).then((base64) => {
        switch (type) {
          case "topBannerDesktop":
            setEditData((prevState) => ({
              ...prevState,
              banner_background: base64,
            }));
            setCurrentBanner((prevState) => ({ ...prevState, top: base64 }));
            break;
          case "topBannerMobile":
            setEditData((prevState) => ({
              ...prevState,
              banner_background_mobile: base64,
            }));
            setCurrentBanner((prevState) => ({
              ...prevState,
              topMobile: base64,
            }));
            break;
          case "sideBanner":
            setEditData((prevState) => ({
              ...prevState,
              banner_side_background: base64,
            }));
            setCurrentBanner((prevState) => ({ ...prevState, side: base64 }));
            break;
          case "bottomBanner":
            setEditData((prevState) => ({
              ...prevState,
              banner_bottom_background_mobile: base64,
            }));
            setCurrentBanner((prevState) => ({ ...prevState, bottom: base64 }));
            break;
        }
      });
    } else {
      alert("Somente imagens abaixo de 5mb");
    }
  }, []);

  useEffect(() => {
    setEditData((prevState) => ({
      ...prevState,
      accent_color: colorValues.background,
      main_sub_color: colorValues.main_sub_color,
      page_text: colorValues.page_text,
      product_background: colorValues.product,
      product_text: colorValues.product_text,
      secundary_text: colorValues.secundary_text,
      tertiary_text: colorValues.tertiary_text,
    }));
  }, [colorValues]);

  const handleSaveEdits = async () => {
    const index = checkoutArray.findIndex(
      (checkout) => checkout.id === props.id
    );

    if (index !== -1) {
      // verifica se o objeto foi encontrado
      const updatedObjects = [
        ...checkoutArray.slice(0, index), // mantém os objetos anteriores ao objeto que será atualizado
        { ...checkoutArray[index], ...editData }, // cria um novo objeto com as propriedades atualizadas
        ...checkoutArray.slice(index + 1), // mantém os objetos após o objeto que será atualizado
      ];

      localStorage.setItem("checkoutArray", JSON.stringify(updatedObjects));
    }

    props.closeModal();
  };

  useEffect(() => {
    setEditData((prevState) => ({ ...prevState, layout: items }));
  }, [items]);

  useEffect(() => {
    setEditData((prevState) => ({ ...prevState, mobile_layout: mobileItems }));
  }, [mobileItems]);

  const closeAll = () => {
    setColorPicker({
      background: false,
      main_sub_color: false,
      page_text: false,
      product: false,
      product_text: false,
      secundary_text: false,
      tertiary_text: false,
    });
  };

  const handleCreateNewCheckout = () => {
    const currentCheckoutArray = JSON.parse(
      localStorage.getItem("checkoutArray") || "[]"
    );

    let newCurrentCheckoutArray = [...currentCheckoutArray, editData];

    localStorage.setItem(
      "checkoutArray",
      JSON.stringify(newCurrentCheckoutArray)
    );

    props.create(newCurrentCheckoutArray);
  };

  return (
    <Container>
      <ModalBox>
        <ModalHeader>
          <b>
            {isEditingLayout && (
              <IoIosArrowBack
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditingLayout(false)}
              />
            )}
            Edição de checkout ✍️
          </b>
        </ModalHeader>
        <hr />

        {!isEditingLayout ? (
          <>
            <Row>Nome do Checkout:</Row>
            <Input>
              <FormInput
                type="text"
                defaultValue={editData.name}
                onChange={(e) => {
                  setEditData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
                placeholder="Nome do checkout"
              />
            </Input>

            <Row>Tipo de produto:</Row>

            <Row style={{ gap: "30px" }}>
              <OptionColumn>
                <small>Digital</small>
                <Switch
                  default={editData.is_digital ? true : false}
                  changeValue={() => {
                    setEditData((prevState) => ({
                      ...prevState,
                      is_digital: true,
                    }));
                  }}
                />
              </OptionColumn>
              <OptionColumn>
                <small>Físico</small>
                <Switch
                  default={editData.is_digital ? false : true}
                  changeValue={() => {
                    setEditData((prevState) => ({
                      ...prevState,
                      is_digital: false,
                    }));
                  }}
                />
              </OptionColumn>
            </Row>

            <hr />

            <div>
              <Row>Cores:</Row>
              <FirstRow
                style={{ margin: "5px !important" }}
                className="colorOptions"
              >
                <OptionColumn>
                  <small>Destaque</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.background}
                    onClick={() =>
                      setColorPicker({ background: !colorPicker.background })
                    }
                  />
                  {colorPicker.background && (
                    <Popover>
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.background}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            background: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
                <OptionColumn>
                  <small>Texto</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.page_text}
                    onClick={() =>
                      setColorPicker({ page_text: !colorPicker.page_text })
                    }
                  />
                  {colorPicker.page_text && (
                    <Popover className="left">
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.page_text}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            page_text: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
                <OptionColumn>
                  <small>Texto secundário</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.main_sub_color}
                    onClick={() =>
                      setColorPicker({
                        main_sub_color: !colorPicker.main_sub_color,
                      })
                    }
                  />
                  {colorPicker.main_sub_color && (
                    <Popover className="left">
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.main_sub_color}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            main_sub_color: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
              </FirstRow>
            </div>

            <div>
              <Row>Cores do menu de produto:</Row>

              <FirstRow className="colorOptions">
                <OptionColumn>
                  <small>Fundo</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.product}
                    onClick={() =>
                      setColorPicker({ product: !colorPicker.product })
                    }
                  />
                  {colorPicker.product && (
                    <Popover>
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.product}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            product: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
                <OptionColumn>
                  <small>Texto</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.product_text}
                    onClick={() =>
                      setColorPicker({
                        product_text: !colorPicker.product_text,
                      })
                    }
                  />
                  {colorPicker.product_text && (
                    <Popover>
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.product_text}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            product_text: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
                <OptionColumn>
                  <small>Texto secundário</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.secundary_text}
                    onClick={() =>
                      setColorPicker({
                        secundary_text: !colorPicker.secundary_text,
                      })
                    }
                  />
                  {colorPicker.secundary_text && (
                    <Popover>
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.secundary_text}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            secundary_text: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
                <OptionColumn>
                  <small>Secundária</small>
                  <ColorPickerBtn
                    backgroundColorValue={colorValues.tertiary_text}
                    onClick={() =>
                      setColorPicker({
                        tertiary_text: !colorPicker.tertiary_text,
                      })
                    }
                  />
                  {colorPicker.tertiary_text && (
                    <Popover className="left">
                      <Cover onClick={() => closeAll()} />
                      <SketchPicker
                        color={colorValues.tertiary_text}
                        onChange={(e) =>
                          setColorValues((prevState) => ({
                            ...prevState,
                            tertiary_text: e.hex,
                          }))
                        }
                      />
                    </Popover>
                  )}
                </OptionColumn>
              </FirstRow>
            </div>

            <hr />

            <Row>Recursos:</Row>

            <OptionColumn>
              <small>Botões de Suporte:</small>
              <Switch
                default={editData.is_support_open}
                changeValue={() => {
                  setIsActive((prevState) => ({
                    ...prevState,
                    support: !isActive.support,
                  }));
                  setEditData((prevState) => ({
                    ...prevState,
                    is_support_open: !editData.is_support_open,
                  }));
                }}
              />
            </OptionColumn>
            {editData.is_support_open && (
              <>
                <Input>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    type="text"
                    className="form-input"
                    placeholder="Whatsapp"
                    value={editData.support_whatsapp}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        support_whatsapp: e.target.value,
                      }))
                    }
                  />
                  <label className="form-label">Whatsapp</label>
                </Input>

                <Input>
                  <FormInput
                    defaultValue={editData.support_email}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        support_email: e.target.value,
                      }))
                    }
                    placeholder="Email"
                  />
                  <label className="form-label">Email</label>
                </Input>
              </>
            )}

            <OptionColumn>
              <small>Contador:</small>
              <Switch
                default={editData.is_timer_on}
                changeValue={() => {
                  setIsActive((prevState) => ({
                    ...prevState,
                    timer: !isActive.timer,
                  }));
                  setEditData((prevState) => ({
                    ...prevState,
                    is_timer_on: !editData.is_timer_on,
                  }));
                }}
              />
            </OptionColumn>

            {editData.is_timer_on && (
              <>
                <Input>
                  <FormInput
                    defaultValue={editData.timer_text}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        timer_text: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Texto do contador"
                  />
                  <label className="form-label">Texto do contador</label>
                </Input>
                <small className="warning">
                  <RiErrorWarningLine />
                  Obs: se não informado, será utilizado o texto padrão "A
                  condição especial terminará em: "
                </small>

                <Input>
                  <InputMask
                    value={editData.timer_time}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        timer_time: e.target.value,
                      }))
                    }
                    mask="99:99"
                    className="form-input"
                    placeholder="Tempo do contador"
                  />
                  <label className="form-label">Tempo do contador</label>
                </Input>
                <small className="warning">
                  <RiErrorWarningLine />
                  Obs: se não informado, será utilizado o tempo padrão 05:00 (5
                  minutos)
                </small>
              </>
            )}

            <OptionColumn>
              <small>Notificações:</small>
              <Switch
                default={editData.is_notification_open}
                changeValue={() =>
                  setEditData((prevState) => ({
                    ...prevState,
                    is_notification_open: !editData.is_notification_open,
                  }))
                }
              />
            </OptionColumn>

            {editData.is_notification_open && (
              <FirstRow>
                <NotificationContainer accent_color={colorValues.background}>
                  <FaShoppingCart size={30} />
                  {isEditingNotification.title ? (
                    <CustomHiddenInput>
                      <input
                        defaultValue={editData.notification_title}
                        onChange={(e) =>
                          setEditData((prevState) => ({
                            ...prevState,
                            notification_title: e.target.value,
                          }))
                        }
                        type="text"
                      />
                      <BsCheckLg
                        onClick={() =>
                          setIsEditingNotification((prevState) => ({
                            ...prevState,
                            title: !isEditingNotification.title,
                          }))
                        }
                      />
                    </CustomHiddenInput>
                  ) : (
                    <span>
                      <h6>{editData.notification_title}</h6>
                      <FaPen
                        onClick={() =>
                          setIsEditingNotification((prevState) => ({
                            ...prevState,
                            title: !isEditingNotification.title,
                          }))
                        }
                      />
                    </span>
                  )}

                  {isEditingNotification.text ? (
                    <CustomHiddenInput>
                      <input
                        defaultValue={editData.notification_text}
                        onChange={(e) =>
                          setEditData((prevState) => ({
                            ...prevState,
                            notification_text: e.target.value,
                          }))
                        }
                        type="text"
                      />
                      <BsCheckLg
                        onClick={() =>
                          setIsEditingNotification((prevState) => ({
                            ...prevState,
                            text: !isEditingNotification.text,
                          }))
                        }
                      />
                    </CustomHiddenInput>
                  ) : (
                    <span>
                      <p>{editData.notification_text}</p>
                      <FaPen
                        onClick={() =>
                          setIsEditingNotification((prevState) => ({
                            ...prevState,
                            text: !isEditingNotification.text,
                          }))
                        }
                      />
                    </span>
                  )}
                </NotificationContainer>
              </FirstRow>
            )}

            <FirstRow>
              <OptionColumn>
                <small>Pedir e-mail do cliente</small>
                <Switch
                  default={editData.ask_for_email}
                  changeValue={() => {
                    setEditData((prevState) => ({
                      ...prevState,
                      ask_for_email: !editData.ask_for_email,
                    }));
                  }}
                />
              </OptionColumn>
              <OptionColumn>
                <small>Checkout exclusivo do produto</small>
                <Switch changeValue={() => console.log("sem email")} />
              </OptionColumn>
            </FirstRow>

            <hr />

            <Row>Layout e Imagens:</Row>

            <EditLayoutBtn onClick={() => setIsEditingLayout(true)}>
              Configurar
              <div className="spin circle">
                <BiRightArrowAlt />
              </div>
            </EditLayoutBtn>

            <hr />
          </>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <h6>Aqui você pode mudar o posicionamento do seu checkout!</h6>

            <Dropdown
              onClick={() =>
                setIsOpen((prevState) => ({
                  ...prevState,
                  product: !isOpen.product,
                }))
              }
            >
              <h7>Dados do produto</h7>
              <RiArrowDropDownLine size={30} />
            </Dropdown>

            {isOpen.product && (
              <>
                <Input>
                  <FormInput
                    defaultValue={editData.product_name}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        product_name: e.target.value,
                      }))
                    }
                    placeholder="Nome do produto"
                  />
                  <label className="form-label">Nome do produto</label>
                </Input>

                <Input>
                  <FormInput
                    defaultValue={editData.product_description}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        product_description: e.target.value,
                      }))
                    }
                    placeholder="Descrição"
                  />
                  <label className="form-label">Descrição</label>
                </Input>

                <Input>
                  <FormInput
                    placeholder="Preço"
                    value={editData.product_price}
                    onChange={(e) =>
                      setEditData((prevState) => ({
                        ...prevState,
                        product_price: parseFloat(
                          e.target.value.replace(/\D/g, "") / 100
                        ).toFixed(2),
                      }))
                    }
                  />
                  <label className="form-label">Preço</label>
                </Input>

                <FirstRow>
                  <OptionColumn>
                    <small>Aceitar Pix</small>
                    <Switch
                      default={editData.accept_pix}
                      changeValue={() => {
                        setEditData((prevState) => ({
                          ...prevState,
                          accept_pix: !editData.accept_pix,
                        }));
                      }}
                    />
                  </OptionColumn>
                  <OptionColumn>
                    <small>Aceitar Cartão</small>
                    <Switch
                      default={editData.accept_card}
                      changeValue={() => {
                        setEditData((prevState) => ({
                          ...prevState,
                          accept_card: !editData.accept_card,
                        }));
                      }}
                    />
                  </OptionColumn>
                  <OptionColumn>
                    <small>Aceitar Boleto</small>
                    <Switch
                      default={editData.accept_billet}
                      changeValue={() => {
                        setEditData((prevState) => ({
                          ...prevState,
                          accept_billet: !editData.accept_billet,
                        }));
                      }}
                    />
                  </OptionColumn>
                </FirstRow>
              </>
            )}

            <Dropdown
              onClick={() =>
                setIsOpen((prevState) => ({
                  ...prevState,
                  desktop: !isOpen.desktop,
                }))
              }
            >
              <h7>Versão de desktop</h7>
              <RiArrowDropDownLine size={30} />
            </Dropdown>
            {isOpen.desktop && (
              <>
                <SortableContext
                  items={editData.layout ? editData.layout : items}
                  strategy={verticalListSortingStrategy}
                >
                  <LayoutDrag>
                    {(editData.layout ? editData.layout : items).map((id) => (
                      <SortableItem key={id} id={id} />
                    ))}
                  </LayoutDrag>
                </SortableContext>
                <hr />
                <h6>Troque seus banners!</h6>
                <small className="sub-titles">Banner do topo:</small>
                <Dropzone
                  onDrop={(onDropProps) =>
                    onDropBanner(onDropProps, "topBannerDesktop")
                  }
                  url={
                    currentBanner.top
                      ? currentBanner.top
                      : editData.banner_background
                  }
                />

                <br />

                <small className="sub-titles">Banner da lateral:</small>
                <Dropzone
                  onDrop={(onDropProps) => {
                    onDropBanner(onDropProps, "sideBanner");
                  }}
                  url={
                    currentBanner.side
                      ? currentBanner.side
                      : editData.banner_side_background
                  }
                />
              </>
            )}

            <Dropdown
              onClick={() =>
                setIsOpen((prevState) => ({
                  ...prevState,
                  mobile: !isOpen.mobile,
                }))
              }
            >
              <h7>
                Versão mobile
                <Tooltip
                  title="Caso não seja inserido nada, utilizaremos os mesmos banners do layout desktop"
                  arrow={true}
                  duration={200}
                  position="top"
                  trigger="mouseenter"
                  theme="dark"
                  style={{ maxWidth: "100px !important" }}
                >
                  <AiOutlineInfoCircle />
                </Tooltip>
              </h7>
              <RiArrowDropDownLine size={30} />
            </Dropdown>

            {isOpen.mobile && (
              <MobileEdit>
                <SortableContext
                  items={
                    editData.mobile_layout
                      ? editData.mobile_layout
                      : mobileItems
                  }
                  strategy={verticalListSortingStrategy}
                >
                  <LayoutDragMobile>
                    {(editData.mobile_layout
                      ? editData.mobile_layout
                      : mobileItems
                    ).map((id) => (
                      <SortableItem isMobile key={id} id={id} />
                    ))}
                  </LayoutDragMobile>
                </SortableContext>
                <DropzonesWrapper>
                  <small className="sub-titles">Banner do topo:</small>
                  <Dropzone
                    onDrop={(onDropProps) =>
                      onDropBanner(onDropProps, "topBannerMobile")
                    }
                    url={
                      currentBanner.topMobile
                        ? currentBanner.topMobile
                        : editData.banner_background_mobile
                    }
                  />
                  <hr />
                  <small className="sub-titles">Banner de baixo:</small>
                  <Dropzone
                    onDrop={(onDropProps) =>
                      onDropBanner(onDropProps, "bottomBanner")
                    }
                    url={
                      currentBanner.bottom
                        ? currentBanner.bottom
                        : editData.banner_bottom_background_mobile
                    }
                  />
                </DropzonesWrapper>
              </MobileEdit>
            )}
            <hr />
          </DndContext>
        )}
        <SaveBtn
          onClick={() =>
            props.id == "new" ? handleCreateNewCheckout() : handleSaveEdits()
          }
        >
          {props.id == "new" ? "Criar" : "Salvar!"}
        </SaveBtn>
      </ModalBox>
      <Background onClick={props.closeModal} />
    </Container>
  );
}

function Dropzone({ onDrop, url }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: "image/*",
      onDrop: onDrop,
    });

  return (
    <DragFiles {...getRootProps()}>
      <input {...getInputProps()} />
      {url ? (
        <Banner src={url} />
      ) : (
        <>
          {isDragActive ? (
            <p>
              <AiFillCamera />
              Drop the files here ...
            </p>
          ) : (
            <p>
              <AiFillCamera size={30} /> Arraste ou faça upload da sua imagem
            </p>
          )}
        </>
      )}
    </DragFiles>
  );
}

export default EditModal;
