from geoserver.catalog import Catalog
class LayerNewCreation():
    
    def create():
        cat = Catalog("http://192.168.56.103:8080/geoserver/")
        ws = cat.create_workspace('newWorkspaceName','http://example.com/testWorkspace')
        ds = cat.create_datastore('newDatastoreName','newWorkspaceName')
        ds.connection_parameters.update(host='localhost', port='5432', database='postgis', user='postgres', passwd='password', dbtype='postgis', schema='postgis')
        cat.save(ds)