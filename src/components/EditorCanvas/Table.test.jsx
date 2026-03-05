import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table.jsx';

vi.mock('../../hooks', () => {
  const layout = { sidebar: true, readOnly: false };
  const database = 'GENERIC';

  return {
    useLayout: () => ({ layout }),
    useSettings: () => ({
      settings: {
        mode: 'light',
        tableWidth: 200,
        showComments: false,
        showFieldSummary: false,
        showDataTypes: true,
      },
    }),
    useDiagram: () => ({
      database,
      deleteTable: vi.fn(),
      deleteField: vi.fn(),
      updateTable: vi.fn(),
    }),
    useSelect: () => ({
      selectedElement: { element: 'NONE', id: -1 },
      setSelectedElement: vi.fn(),
      bulkSelectedElements: [],
      setBulkSelectedElements: vi.fn(),
    }),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock('../../data/datatypes', () => ({
  dbToTypes: {
    GENERIC: {
      INT: {
        color: 'text-blue-500',
        isSized: false,
        hasPrecision: false,
      },
    },
  },
}));

vi.mock('../../i18n/utils/rtl', () => ({
  isRtl: () => false,
}));

vi.mock('../../i18n/i18n', () => ({
  default: { language: 'en' },
}));

vi.mock('../../utils/utils', () => ({
  getCommentHeight: () => 0,
  getTableHeight: () => 100,
}));

describe('Table component delete all fields action', () => {
  const baseTable = {
    id: 1,
    name: 'users',
    x: 0,
    y: 0,
    color: '#000000',
    comment: '',
    indices: [],
    fields: [
      { id: 'f1', name: 'id', type: 'INT', primary: true },
      { id: 'f2', name: 'name', type: 'INT', primary: false },
    ],
  };

  const renderTable = (overrides = {}) =>
    render(
      <svg>
        <Table
          tableData={{ ...baseTable, ...overrides }}
          onPointerDown={() => {}}
          setHoveredTable={() => {}}
          handleGripField={() => {}}
          setLinkingLine={() => {}}
        />
      </svg>,
    );

  it('enables delete_all_fields button when there are fields and not read-only', () => {
    renderTable();

    const button = screen.getByRole('button', { name: 'delete_all_fields' });
    expect(button).toBeEnabled();
  });

  it('disables delete_all_fields button when there are no fields', () => {
    renderTable({ fields: [] });

    const button = screen.getByRole('button', { name: 'delete_all_fields' });
    expect(button).toBeDisabled();
  });
});

