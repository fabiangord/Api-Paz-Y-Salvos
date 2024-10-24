import { StandardFonts } from 'pdf-lib'
import { FormatService } from './format-p&s'

export class DocumentService {
  constructor(
    private readonly service: FormatService = new FormatService()) { }

  async createDocument(id: string, idRequest: string): Promise<Uint8Array> {
    const document = await this.service.loadDocument()

    const user = await this.service.userInfoDocument(id)

    const contract = await this.service.findContract(idRequest)

    const areaManagers = await this.service.infoAMPdf()

    const signs = await this.service.signs()

    await document.embedFont(StandardFonts.TimesRoman)

    const form = document.getForm()

    // const field = form.getFields().map((field) => field.getName())

    form.getTextField('Nombres_Apellidos_Contratista').setText(`${user.name} ${user.lastname}`)

    form.getTextField('Identificacion').setText(user.document)

    form.getTextField('Ciudad').setText(user.city)

    form.getTextField('Fecha_es_:date').setText(` ${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`)

    form.getTextField('Regional').setText('Distrito Capital')

    form.getTextField('Direccion_Oficina_Contrato').setText(user.Site.site)

    form.getTextField('Numero_y_FechaContrato').setText(`${contract?.contract.NoContract} / ${contract?.contract.dateI}`)

    form.getTextField('Check').setText('X')

    form.getTextField('NombresApellidos_AlmacenInventario').setFontSize(5)

    form.getTextField('NombresApellidos_AlmacenInventario').setText('Generar reporte de https://miinventario.sena.edu.co/Inicio.aspx y anexar el formato')

    // console.log(field)

    await this.service.generateInfoAMPdf('NombresApellidos_GestionTIC', 'GestionTIC_es_:signer:signature', 'A', document, form, signs, areaManagers, 'fechadl:GestionTIC_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_AdmnistracionDocumentos', 'Administracion de documentos _es_:signer:signature', 'B', document, form, signs, areaManagers, 'fechadl:Administracion_de_documentos_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_EntregaCarne', 'Entrega Carné_es_:signer:signature', 'C', document, form, signs, areaManagers, 'fechadl:EntregaCarné_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_ServiciosGenerales', 'Servicios Generales_es_:signer:signature', 'D', document, form, signs, areaManagers, 'fechadl:Servicios_generales_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_Contabilidad', 'Contabilidad_es_:signer:signature', 'E', document, form, signs, areaManagers, 'fechadl:Contabilidad_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_Tesoreria', 'Tesoreria_es_:signer:signature', 'F', document, form, signs, areaManagers, 'fechadl:Tesoreria_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_CoordinacionGrupo', 'Coordinacion Grupo _es_:signer:signature', 'G', document, form, signs, areaManagers, 'fechadl:Coordinacion_grupo_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_Biblioteca', 'Biblioteca_es_:signer:signature', 'H', document, form, signs, areaManagers, 'fechadl:Biblioteca_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_OtroCentro', 'Otro Centro Logistico _es_:signer:signature', 'I', document, form, signs, areaManagers, 'fechadl:Otro_centro_logistico_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_OtroAmbiente', 'Otro Ambiente Global_es_:signer:signature', 'J', document, form, signs, areaManagers, 'fechadl:Otro_ambiente_global_es_:date')

    await this.service.generateInfoAMPdf('NombresApellidos_SupervisorContrato', 'Supervisor Contrato_es_:signer:signature', 'K', document, form, signs, areaManagers, 'fechadl:Supervisor_contrato_es_:date')

    await this.service.getSignClient(id, 'Firma contratista_es_:signer:signature', form, document)

    form.flatten()

    return await document.save()
  }
}
