import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Eventos, { IEventoPayload } from "../../models/Eventos";
import { ISOToDate, dateToISO } from "../../utils/funcoes";
import { DevTool } from "@hookform/devtools";

const EventosEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const onClickClose = () => {
    navigate("..");
  };

  // Get evento
  const { id } = useParams();
  const { isPending: isPendingGet, error, data } = Eventos.getEvento(id!);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPendingGet) {
      console.log("Set loading foi");
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar evento");
    }
  }, [isPendingGet]);

  // edit evento
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<IEventoPayload>();

  useEffect(() => {
    if (data?.imagem) {
      setSelectedPhoto(data.imagem);
    }
  }, [data]);

  const { mutate, isPending: isPendingPatch } = Eventos.updateEvento({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("evento editado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao editar evento: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<IEventoPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      evento: data.evento,
      inicio: dateToISO(data.inicio),
      final: dateToISO(data.final),
      aberto: data.aberto,
      imagem: selectedPhoto,
      texto: data.texto,
    });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal classes="w-11/12 max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg my-8">
          Editar #{data?.id} | {data?.evento}
        </h3>
        <div className="flex flex-row ">
          <div className="flex flex-col gap-3 w-full">
            <label className="input input-bordered flex items-center gap-2">
              Evento
              <input
                {...register("evento", {
                  required: "Evento deve ser preenchido",
                })}
                defaultValue={data?.evento}
                className="grow bg-base-100"
              />
            </label>
            <div className="text-error">
              {errors.evento && dirtyFields.evento && (
                <p>{errors.evento.message}</p>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2">
              Início
              <input
                {...register("inicio", {
                  required: "Início deve ser preenchido",
                })}
                defaultValue={ISOToDate(data?.inicio!)}
                className="grow bg-base-100"
              />
            </label>
            <div className="text-error">
              {errors.inicio && dirtyFields.inicio && (
                <p>{errors.inicio.message}</p>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2">
              Final
              <input
                {...register("final", {
                  required: "Final deve ser preenchido",
                })}
                defaultValue={data?.final && ISOToDate(data?.final!)}
                className="grow bg-base-100"
              />
            </label>
            <div className="text-error">
              {errors.final && dirtyFields.final && (
                <p>{errors.final.message}</p>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2">
              Aberto
              <input
                type="checkbox"
                {...register("aberto")}
                className="checkbox"
                defaultChecked={data?.aberto}
              />{" "}
            </label>
            <button
              disabled={isPendingPatch}
              type="submit"
              className="btn btn-primary font-semibold text-lg"
            >
              {isPendingPatch ? "Editando..." : "Editar"}
            </button>
          </div>
          <div className="divider divider-horizontal">|</div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              {selectedPhoto ? (
                <div className="border border-base-300 rounded shadow-lg p-4">
                  <img
                    src={selectedPhoto}
                    alt="Preview"
                    className="max-w-[400px] max-h-[200px]"
                  />
                </div>
              ) : (
                <div>Não há foto salva</div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handlePhotoChange}
              />
              <button
                className="btn btn-primary"
                onClick={(e: any) => {
                  e.preventDefault();
                  inputRef.current?.click();
                }}
              >
                Selecionar arquivo
              </button>
            </div>
            <div>
              <textarea
                {...register("texto")}
                defaultValue={data?.texto}
                className="textarea textarea-bordered w-full h-32"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default EventosEdit;
