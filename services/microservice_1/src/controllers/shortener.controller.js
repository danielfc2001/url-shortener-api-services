import { registerNewUrlAccess } from "../libs/registerNewUrlAccess.js";
import urlModel from "../schemas/urlModel.js";

export const redirectToUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await urlModel.find({});
    if (found.length === 0)
      throw new Error(
        "A ocurrido un error al recibir los datos de la base de datos."
      );
    const match = found.filter((el) => {
      return el.shortUrl.includes(id);
    });
    if (match.length === 0) {
      return res.status(404).render("pages/index", {
        typeError: 404,
      });
    }

    // Habilitar la opcion cuando se reinicie la base de datos.
    if (!match[0].isUnlocked) {
      return res.status(401).render("pages/index", {
        typeError: 401,
      });
    }

    registerNewUrlAccess(match[0]._id, req)
      .then((response) => {
        console.log(req.ip);
        console.log(response);
        res.set({
          "Cache-Control": "no-store",
        });
        res.redirect(301, match[0].baseUrl);
      })
      .catch((error) => {
        res.redirect(301, match[0].baseUrl);
      });
  } catch (error) {
    res.status(500).render("pages/index", {
      typeError: 500,
    });
  }
};
