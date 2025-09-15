'use client';

import React from 'react';
import Link from 'next/link';

export default function PurchasePanel({ slug, price, options }) {
  const [qty, setQty] = React.useState(1);
  const [opt, setOpt] = React.useState(options?.values?.[0] || '');

  const addToCart = () => {
    alert(`Added to cart:\n${slug} x${qty}${opt ? ` (${opt})` : ''}`);
  };

  return (
    <div className="rounded-2xl border border-gray-400 bg-white p-5">
      {/* Price row */}
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-semibold text-gray-900">{price}</p>
        <p className="text-xs text-gray-500">VAT included where applicable</p>
      </div>

      {/* Options (select) */}
      {options?.values?.length ? (
        <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-2">
            {options.label}
          </label>
          <select
            value={opt}
            onChange={(e) => setOpt(e.target.value)}
            className="
              w-full rounded-xl
              border border-gray-300
              bg-white text-gray-900
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-black/10
            "
          >
            {options.values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {/* Quantity */}
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="qty" className="text-sm text-gray-700">
          Qty
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="
            w-20 rounded-xl
            border border-gray-300
            bg-white text-gray-900
            px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-black/10
          "
        />
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={addToCart}
          className="
            rounded-xl bg-black text-white
            px-4 py-2 text-sm font-medium
            hover:opacity-90
            focus:outline-none focus:ring-2 focus:ring-black/20
          "
        >
          Add to cart
        </button>
        <Link
          href={`/checkout?sku=${encodeURIComponent(slug)}&qty=${qty}${
            opt ? `&opt=${encodeURIComponent(opt)}` : ''
          }`}
          className="
            rounded-xl border border-gray-300 bg-white
            px-4 py-2 text-sm font-medium text-gray-900
            hover:bg-gray-50
            text-center
            focus:outline-none focus:ring-2 focus:ring-black/10
          "
        >
          Buy now
        </Link>
      </div>

      {/* Help link */}
      <p className="mt-3 text-xs text-gray-500">
        Prefer talking first?{' '}
        <Link
          href={`/contact?subject=${encodeURIComponent('Product enquiry: ' + slug)}`}
          className="underline underline-offset-4 text-gray-600 hover:text-gray-800"
        >
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}
