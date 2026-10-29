import { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircleDollarSign, Loader2, Plus, ReceiptText, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  crearCostoActividad,
  listarCostosActividad,
  type CreateCostoActividadPayload,
  type RubroCostoProductivo,
} from '../../../../../api/costos-productivos.api';
import './modals.css';

interface CostosActividadModalProps {
  actividad: { id: number; titulo?: string };
  organizacionId: number;
  onClose: () => void;
}

const RUBROS: Array<{ value: RubroCostoProductivo; label: string }> = [
  { value: 'INSUMO', label: 'Insumos' },
  { value: 'MAQUINARIA', label: 'Maquinaria' },
  { value: 'MANO_DE_OBRA', label: 'Mano de obra' },
  { value: 'CONTRATISTA', label: 'Contratista' },
  { value: 'SERVICIO', label: 'Servicios' },
  { value: 'COMBUSTIBLE', label: 'Combustible' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento' },
  { value: 'OTRO', label: 'Otro' },
];

const formInicial = (): CreateCostoActividadPayload => ({
  rubro: 'INSUMO',
  descripcion: '',
  monto: 0,
  fecha: new Date().toISOString().slice(0, 10),
});

const moneda = (monto: number | string) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
}).format(Number(monto));

export const CostosActividadModal = ({
  actividad,
  organizacionId,
  onClose,
}: CostosActividadModalProps) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreateCostoActividadPayload>(formInicial);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const costosQuery = useQuery({
    queryKey: ['costos-productivos', organizacionId, actividad.id],
    queryFn: () => listarCostosActividad(organizacionId, actividad.id),
  });
  const costos = costosQuery.data ?? [];
  const total = useMemo(
    () => costos.reduce((acumulado, costo) => acumulado + Number(costo.monto), 0),
    [costos],
  );

  const crearMutation = useMutation({
    mutationFn: (payload: CreateCostoActividadPayload) =>
      crearCostoActividad(organizacionId, actividad.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['costos-productivos', organizacionId, actividad.id],
      });
      queryClient.invalidateQueries({ queryKey: ['finanzas'] });
      queryClient.invalidateQueries({ queryKey: ['finanzas-resumen'] });
      setForm(formInicial());
      idempotencyKeyRef.current = null;
      setMostrarFormulario(false);
      toast.success('Costo real y egreso financiero registrados');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'No se pudo registrar el costo real.');
    },
  });

  const guardarCosto = (event: React.FormEvent) => {
    event.preventDefault();
    const descripcion = form.descripcion.trim();
    if (!descripcion || !form.monto || Number(form.monto) <= 0) {
      toast.error('Indicá una descripción y un monto mayor a cero.');
      return;
    }
    crearMutation.mutate({
      ...form,
      descripcion,
      monto: Number(form.monto),
      cantidad: form.cantidad ? Number(form.cantidad) : undefined,
      costoUnitario: form.costoUnitario ? Number(form.costoUnitario) : undefined,
      superficieHa: form.superficieHa ? Number(form.superficieHa) : undefined,
      idempotencyKey: idempotencyKeyRef.current ??= crypto.randomUUID(),
    });
  };

  return (
    <div className="costos-modal-overlay" role="dialog" aria-modal="true">
      <div className="costos-modal">
        <div className="costos-modal-header">
          <div>
            <div className="costos-modal-title"><CircleDollarSign size={20} /><h3>Costos reales del trabajo</h3></div>
            <p>{actividad.titulo ?? 'Trabajo completado'}</p>
          </div>
          <button className="costos-close" onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
        </div>

        <div className="costos-modal-summary">
          <div><span>Costos registrados</span><strong>{costos.length}</strong></div>
          <div><span>Total real</span><strong>{moneda(total)}</strong></div>
          <p>Cada costo crea un único egreso vinculado en Finanzas.</p>
        </div>

        {costosQuery.isLoading ? (
          <div className="costos-empty"><Loader2 size={20} className="animate-spin" /> Cargando costos...</div>
        ) : costos.length === 0 ? (
          <div className="costos-empty"><ReceiptText size={22} /> Todavía no registraste costos para este trabajo.</div>
        ) : (
          <div className="costos-lista">
            {costos.map((costo) => (
              <article key={costo.id} className="costo-item">
                <div>
                  <span className="costo-rubro">{RUBROS.find((rubro) => rubro.value === costo.rubro)?.label ?? costo.rubro}</span>
                  <strong>{costo.descripcion}</strong>
                  <small>
                    {new Date(costo.fecha).toLocaleDateString('es-AR')}
                    {costo.creadoPor ? ` · Registrado por ${[costo.creadoPor.nombre, costo.creadoPor.apellido].filter(Boolean).join(' ')}` : ''}
                  </small>
                </div>
                <b>{moneda(costo.monto)}</b>
              </article>
            ))}
          </div>
        )}

        {mostrarFormulario ? (
          <form className="costos-form" onSubmit={guardarCosto}>
            <div className="costos-form-title">Nuevo costo real</div>
            <div className="costos-form-grid">
              <label>Rubro
                <select value={form.rubro} onChange={(event) => setForm((actual) => ({ ...actual, rubro: event.target.value as RubroCostoProductivo }))}>
                  {RUBROS.map((rubro) => <option key={rubro.value} value={rubro.value}>{rubro.label}</option>)}
                </select>
              </label>
              <label>Fecha
                <input required type="date" value={form.fecha} onChange={(event) => setForm((actual) => ({ ...actual, fecha: event.target.value }))} />
              </label>
            </div>
            <label>Descripción
              <input required value={form.descripcion} onChange={(event) => setForm((actual) => ({ ...actual, descripcion: event.target.value }))} placeholder="Ej.: Fertilizante aplicado en lote norte" />
            </label>
            <div className="costos-form-grid costos-form-grid-four">
              <label>Monto (ARS)
                <input required min="0.01" step="0.01" type="number" value={form.monto || ''} onChange={(event) => setForm((actual) => ({ ...actual, monto: Number(event.target.value) }))} />
              </label>
              <label>Cantidad <em>opcional</em>
                <input min="0.0001" step="0.0001" type="number" value={form.cantidad ?? ''} onChange={(event) => setForm((actual) => ({ ...actual, cantidad: event.target.value ? Number(event.target.value) : undefined }))} />
              </label>
              <label>Unidad <em>opcional</em>
                <input value={form.unidad ?? ''} onChange={(event) => setForm((actual) => ({ ...actual, unidad: event.target.value || undefined }))} placeholder="kg, l, hs" />
              </label>
              <label>Superficie <em>opcional</em>
                <input min="0.01" step="0.01" type="number" value={form.superficieHa ?? ''} onChange={(event) => setForm((actual) => ({ ...actual, superficieHa: event.target.value ? Number(event.target.value) : undefined }))} placeholder="ha" />
              </label>
            </div>
            <div className="costos-form-actions">
              <button type="button" className="btn-sm btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
              <button type="submit" className="btn-sm btn-primary" disabled={crearMutation.isPending}>{crearMutation.isPending ? 'Registrando...' : 'Guardar costo'}</button>
            </div>
          </form>
        ) : (
          <button className="btn-sm btn-primary costos-add" onClick={() => setMostrarFormulario(true)}><Plus size={15} /> Registrar costo real</button>
        )}
      </div>
    </div>
  );
};
