import { NOTE_STATES, WORKORDER_STATES } from '../utils/stateMachine';

/**
 * Base de datos simulada con datos iniciales
 */
export const initialData = {
  notes: [
    {
      id: 'NOTE-001',
      date: '2026-04-08T14:30:00',
      epName: 'Carlos Pérez López',
      epPhone: '+57-300-123-4567',
      epEmail: 'carlos.perez@empresa.gov.co',
      description: 'Poste de luz dañado en la esquina, presenta riesgo de electrocución',
      location: {
        address: 'Calle 5 # 120',
        zone: 'Centro',
        city: 'Bogotá',
        coordinates: { lat: 4.7110, lng: -74.0075 }
      },
      status: NOTE_STATES.REGISTRADA,
      priority: 'Alta',
      workOrderId: null,
      evidence: [],
      updatedAt: '2026-04-08T14:30:00'
    },
    {
      id: 'NOTE-002',
      date: '2026-04-07T10:15:00',
      epName: 'María González Ruiz',
      epPhone: '+57-300-987-6543',
      epEmail: 'maria.gonzalez@empresa.gov.co',
      description: 'Alcantarilla destapada en la avenida principal',
      location: {
        address: 'Avenida Caracas # 450',
        zone: 'Centro-Norte',
        city: 'Bogotá',
        coordinates: { lat: 4.7300, lng: -74.0080 }
      },
      status: NOTE_STATES.PENDIENTE_ANALISIS,
      priority: 'Media',
      workOrderId: null,
      evidence: [],
      updatedAt: '2026-04-07T10:15:00'
    },
    {
      id: 'NOTE-003',
      date: '2026-04-06T09:45:00',
      epName: 'Juan Martínez Díaz',
      epPhone: '+57-300-555-8899',
      epEmail: 'juan.martinez@empresa.gov.co',
      description: 'Grietas en la acera frente al edificio',
      location: {
        address: 'Calle 50 # 200',
        zone: 'Chapinero',
        city: 'Bogotá',
        coordinates: { lat: 4.6800, lng: -74.0090 }
      },
      status: NOTE_STATES.ANALIZADA,
      priority: 'Baja',
      workOrderId: 'WO-001',
      evidence: [],
      updatedAt: '2026-04-06T11:00:00'
    }
  ],

  workOrders: [
    {
      id: 'WO-001',
      noteId: 'NOTE-003',
      createdAt: '2026-04-06T11:00:00',
      status: WORKORDER_STATES.EN_EJECUCION,
      crewId: 'CREW-001',
      technicians: ['TEC-001'],
      timeline: {
        start: '2026-04-08T08:00:00',
        end: null,
        estimatedHours: 2,
        actualHours: 4
      },
      evidence: [
        {
          id: 'EV-001',
          type: 'photo',
          filename: 'antes-grieta.jpg',
          uploadedAt: '2026-04-08T10:30:00'
        },
        {
          id: 'EV-002',
          type: 'photo',
          filename: 'durante-reparacion.jpg',
          uploadedAt: '2026-04-08T11:15:00'
        }
      ],
      closure: {
        completed: false,
        signature: null,
        notes: '',
        completedAt: null
      }
    },
    {
      id: 'WO-002',
      noteId: null,
      createdAt: '2026-04-09T09:30:00',
      status: WORKORDER_STATES.PENDIENTE_ASIGNACION,
      crewId: null,
      technicians: [],
      timeline: {
        start: null,
        end: null,
        estimatedHours: 3,
        actualHours: 0
      },
      evidence: [],
      closure: {
        completed: false,
        signature: null,
        notes: '',
        completedAt: null
      }
    }
  ],

  crews: [
    {
      id: 'CREW-001',
      name: 'Cuadrilla Centro - Mantenimiento Vial',
      zone: 'Centro',
      technicians: ['TEC-001', 'TEC-002'],
      status: 'En Actividad',
      availableHours: 4,
      contact: '+57-300-111-2222'
    },
    {
      id: 'CREW-002',
      name: 'Cuadrilla Centro-Norte - Servicios Públicos',
      zone: 'Centro-Norte',
      technicians: ['TEC-003', 'TEC-004'],
      status: 'Disponible',
      availableHours: 8,
      contact: '+57-300-333-4444'
    },
    {
      id: 'CREW-003',
      name: 'Cuadrilla Chapinero - Infraestructura',
      zone: 'Chapinero',
      technicians: ['TEC-005', 'TEC-006'],
      status: 'Disponible',
      availableHours: 8,
      contact: '+57-300-555-6666'
    }
  ],

  technicians: [
    {
      id: 'TEC-001',
      name: 'Roberto Silva García',
      role: 'Técnico Senior',
      crewId: 'CREW-001',
      phone: '+57-300-111-2222',
      status: 'En Trabajo'
    },
    {
      id: 'TEC-002',
      name: 'Luis Vargas Moreno',
      role: 'Técnico',
      crewId: 'CREW-001',
      phone: '+57-300-111-2223',
      status: 'Disponible'
    },
    {
      id: 'TEC-003',
      name: 'Diego López Ramírez',
      role: 'Técnico Senior',
      crewId: 'CREW-002',
      phone: '+57-300-333-4444',
      status: 'Disponible'
    },
    {
      id: 'TEC-004',
      name: 'Carlos Mendez Flores',
      role: 'Técnico',
      crewId: 'CREW-002',
      phone: '+57-300-333-4445',
      status: 'Disponible'
    },
    {
      id: 'TEC-005',
      name: 'Fernando Castillo Guzmán',
      role: 'Técnico Senior',
      crewId: 'CREW-003',
      phone: '+57-300-555-6666',
      status: 'Disponible'
    },
    {
      id: 'TEC-006',
      name: 'Andrés Martínez Reyes',
      role: 'Técnico',
      crewId: 'CREW-003',
      phone: '+57-300-555-6667',
      status: 'Disponible'
    }
  ]
};