'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CheckCircleIcon } from 'lucide-react'

export default function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="text-green-500" size={32} />
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                    ¡Cita registrada con éxito!
                  </Dialog.Title>
                </div>
                <div className="mt-4 text-sm text-gray-700">
                  Pronto nos pondremos en contacto contigo para confirmar tu cita.
                </div>
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
