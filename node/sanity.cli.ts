import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '440lpl2l',
    dataset: 'production',
  },
  deployment: {
    appId: 'lkyx8jaxliqnyr5j3t4s8qfv',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
